"use strict";

const mysql = require('./config.js');
const multer = require('multer');
const fs = require('fs').promises;

const report = {
    getReportList : async function() {
        try {
            const [result] = await mysql.query("SELECT ReportId, Latitude, Longitude FROM report WHERE DispStatus = 1");
            return result;
        } catch (error) {
            console.log("report: map list 조회 오류 발생");
        }
    },
    getReportDetails : async function(id) {
        try {
            const [result] = await mysql.query("SELECT reportId, type, image FROM report WHERE reportId = ?", [id]);
            return result;
        } catch (error) {
            console.log("report: detail 조회 오류 발생");
            console.log(error)
        }
    },
    getNearbyReportListOfUser : async function(userId, type, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE USERId = ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [userId, type, latitude, longitude, latitude]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyReportListOfUser 오류 발생");
            throw error;
        }
    },
    getNearbyReportRemovalListOfUser : async function (userId, reportId) {
        try {
            const [result] = await mysql.query("SELECT * FROM reportRemovalRequest WHERE USERId = ? AND reportId = ?", [userId, reportId]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyReportRemovalListOfUser 오류 발생");
            throw error;
        }
    },
    getNearbyReportList : async function(userId, type, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE userId != ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [userId, type, latitude, longitude, latitude]);
            return result;
        } catch (error) {
            console.log("report: getNearbyReportList 오류 발생");
            throw error;
        }
    },
    getNearbyApprovedReport : async function(type, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE tpye = ? AND DispStatus = 1 AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [type, latitude, longitude, latitude]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyApprovedReport 오류 발생");
            throw error;
        }
    },
    addReport : async function(userId, type, latitude, longitude, imagePath) {
        try {
            await mysql.query("INSERT INTO report (USERId, type, latitude, longitude, image, requestedDateTime) VALUES (?, ?, ?, ?, ?, NOW())", [userId, type, latitude, longitude, imagePath]);
            console.log("report: addReport 완료!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            return true;
        } catch (error) {
            console.log("report: addReport 오류 발생 " + error)
            throw error;
        }
    },
    addReportRemoval : async function(userId, reportId, imagePath) {
        try {
            await mysql.query("INSERT INTO reportRemovalRequest (USERId, reportId, image, requestedDateTime) VALUES (?, ?, ?, NOW())", [userId, reportId, imagePath]);
            console.log("report: addReportRemoval 완료")
            return true;
        } catch (error) {
            console.log("report: addReportRemoval 오류 발생")
            throw error;
        }
    },
    deleteImage: async function(imagePath) {
        try {
            if (await fs.access(imagePath)) await fs.unlink(imagePath);
            console.log("report: deleteImage 완료");
            return true;
        } catch (error) {
            console.log("report: deleteImage 오류 발생", error);
            return true;
        }
    },
    getManagerReportList : async function() {
        try {
            const [result] = await mysql.execute("SELECT * FROM report WHERE DispStatus = 0 ORDER BY requestedDateTime ASC");
            console.log("report: getManagerReportList 완료")
            return result;
        } catch (error) {
            console.log("report: getManagerReportList 오류 발생")
            throw error;
        }
    },
    getManagerDeleteReportList : async function() {
        try {
            const [result] = await mysql.execute(`
                SELECT r.reportId, r.type, r.image AS reportImage, rrr.image AS removalRequestImage, rrr.requestedDateTime, rrr.USERId
                FROM reportRemovalRequest rrr
                JOIN report r ON rrr.reportId = r.reportId
                ORDER BY rrr.requestedDateTime ASC
            `);
            return result;
        } catch (error) {
            console.log("report: getManagerDeleteReportList 오류 발생")
            throw error;
        }
    },
    getReportType : async function(reportId) {
        try {
            const [result] = await mysql.execute("SELECT type FROM report WHERE reportId = ?", [reportId]);
            return result[0].type;
        } catch (error) {
            console.log("report: getReportType 오류 발생")
            throw error;
        }
    },
    getNumOfNearbySameReports : async function(reportId, type) {
        try {
            const [currentReport] = await mysql.execute("SELECT latitude, longitude FROM report WHERE reportId = ? AND type = ?", [reportId, type]);
            console.log(currentReport)
            if (currentReport !== null) {
                const currentLatitude = currentReport[0].latitude;
                const currentLongitude = currentReport[0].longitude;
                const [result] = await mysql.query("SELECT COUNT(*) as count, reportId FROM report WHERE DispStatus = 0 AND reportId != ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [reportId, type, currentLatitude, currentLongitude, currentLatitude]);
                console.log(result)
                return result
            }
            return null;
        } catch (error) {
            console.log("report: getNearbySameReports 오류 발생\n" + error)
            throw error;
        }
    },
    getNearbySameReports : async function(reportId, type) {
        try {
            const [currentReport] = await mysql.execute("SELECT latitude, longitude FROM report WHERE reportId = ? AND type = ?", [reportId, type]);
            console.log(currentReport)
            const currentLatitude = currentReport[0].latitude;
            const currentLongitude = currentReport[0].longitude;
            const [result] = await mysql.query("SELECT * FROM report WHERE DispStatus = 0 AND reportId != ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [reportId, type, currentLatitude, currentLongitude, currentLatitude]);
            console.log(result)
            return [result]
        } catch (error) {
            console.log("report: getNearbySameReports 오류 발생\n" + error)
            throw error;
        }
    },
    registerApprove : async function(reportId, type, point) {
        try {
            const [userInfo] = await mysql.execute("SELECT USERId, image FROM report WHERE reportId = ?", [reportId]);
            const userId = userInfo[0].USERId;
            const imagePath = userInfo[0].image;
            await mysql.execute("UPDATE report SET DispStatus = 1 WHERE reportId = ? AND type = ?", [reportId, type]);
            await mysql.execute("UPDATE USER SET Points = Points + ? WHERE USERId = ?", [point, userId]);
            console.log(`report: registerApprove 완료 (${reportId}, ${type}, ${point})`);
            return true;
        } catch (error) {
            console.log("report: registerApprove 오류 발생")
            throw error;
        }
    },
    registerNearbyApprove : async function(reportId, type, point) {
        try {
            const [userInfo] = await mysql.execute("SELECT USERId, image FROM report WHERE reportId = ?", [reportId]);
            const userId = userInfo[0].USERId;
            const imagePath = userInfo[0].image;
            await mysql.execute("DELETE FROM report WHERE reportId = ? AND type = ? AND DispStatus = 0", [reportId, type]);
            await this.deleteImage(imagePath);
            await mysql.execute("UPDATE USER SET Points = Points + ? WHERE USERId = ?", [point, userId]);
            console.log(`report: registerNearbyApprove 완료 (${reportId}, ${type}, ${point})`);
        } catch (error) {
            console.log("report: registerNearbyApprove 오류 발생")
            throw error;
        }
    },
    registerAutoApprove: async function() {
        try {
            const [reportList] = await this.getManagerReportList();
            console.log(reportList)
    
            // 각 제보에 대해 인근 제보가 5개 이상인 경우 자동 승인
            for (const report of reportList) {
                const reportId = report.reportId;
                const type = report.type;
                console.log(`현재 report >>> ${reportId}번, ${type == 0 ? "포트홀" : "공사현장"}`);
    
                // 해당 제보에 대해 인근 동일 제보의 개수를 가져옵니다.
                const [nearbySameReports] = await this.getNumOfNearbySameReports(reportId, type);
    
                if (nearbySameReports) {
                    const numberOfReports = nearbySameReports.count;
    
                    // 인근 동일 제보가 5개 이상인 경우에만 자동 승인 절차를 진행합니다.
                    if (numberOfReports >= 5) {
                        // 해당 제보를 자동으로 승인 처리합니다.
                        await this.registerApprove(reportId, type, 100 / numberOfReports);
    
                        // 인근 동일 제보들에 대해서도 자동 승인 처리를 반복합니다.
                        const [restNearbySameReports] = await this.getNearbySameReports(reportId, type);
                        console.log(restNearbySameReports);
    
                        for (const restReport of restNearbySameReports) {
                            await this.registerNearbyApprove(restReport.reportId, type, 100 / numberOfReports);
                        }
                    }
                }
            }
            return true;
        } catch (error) {
            console.log("registerAutoApprove 오류 발생:", error.message);
            throw error;
        }
    },    
    registerReject : async function(reportId, type) {
        try {
            const [info] = await mysql.execute("SELECT image FROM report WHERE reportId = ?", [reportId]);
            const imagePath = info[0].image;
            await mysql.execute("DELETE FROM report WHERE reportId = ? AND type = ? AND DispStatus = 0", [reportId, type]);
            await this.deleteImage(imagePath);
            console.log(`report: registerReject 완료 (${reportId}, ${type})`);
        } catch (error) {
            console.log("report: registerReject 오류 발생" + error)
            throw error;
        }
    },
    getRemovalImage : async function(reportId, userId) {
        const [result] = await mysql.execute("SELECT image FROM reportRemovalRequest WHERE reportId = ? AND USERId = ?", [reportId, userId]);
        return result[0].image;
    },
    removalApprove : async function(reportId, userId) {
        try {
            const removalImagePath = await this.getRemovalImage(reportId, userId);
            const [imagePath] = await mysql.execute("SELECT image FROM report WHERE reportId = ?", [reportId]);
            const registerImagePath = imagePath[0].image;
            const [sameReportRemovalList] = await mysql.execute("SELECT * FROM reportRemovalRequest WHERE reportId = ? AND USERId != ?", [reportId, userId]);
            if (sameReportRemovalList.length == 0) {
                await mysql.execute("DELETE FROM reportRemovalRequest WHERE reportId = ? AND USERId = ?", [reportId, userId]);
                await mysql.execute("DELETE FROM report WHERE reportId = ?", [reportId]);
                await mysql.execute("UPDATE USER SET Points = Points + 80 WHERE USERId = ?", [userId]);
                await this.deleteImage(removalImagePath);
                await this.deleteImage(registerImagePath);
                console.log(`report: removalApprove 완료`)
            }
            else {
                const [usersAmount] = await mysql.execute("SELECT COUNT(*) as count FROM report WHERE reportId = ? AND USERId != ?", [reportId, userId]);
                const count = usersAmount[0].count; // 본인 제외 같은 제보 수
                console.log(`count = ${count}`)
                const points = parseInt(80 / count);
                console.log(`points = ${points}`)
                await mysql.execute("DELETE FROM reportRemovalRequest WHERE reportId = ? AND USERId = ?", [reportId, userId]);
                await mysql.execute("UPDATE USER SET Points = Points + ? WHERE USERId = ?", [points, userId]);
                await this.deleteImage(removalImagePath);
                console.log(`대상 제보 제거요청 삭제 완료`)

                for (const sameReport of sameReportRemovalList) {
                    const currentUser = sameReport.USERId;
                    const image = sameReport.image;
                    console.log(`currentUser = ${currentUser}, image = ${image}`)
                    await mysql.execute("DELETE FROM reportRemovalRequest WHERE reportId = ? AND USERId = ?", [reportId, currentUser]);
                    await mysql.execute("UPDATE USER SET Points = Points + ? WHERE USERId = ?", [points, currentUser]);
                    await this.deleteImage(image);
                    console.log(`동일 제보 제거요청 삭제 완료`)
                }
                await mysql.execute("DELETE FROM report WHERE reportId = ?", [reportId]);
                await this.deleteImage(registerImagePath);
            }
            console.log(`report: removalApprove 완료`)
        } catch (error) {
            console.log("report: removalApprove 오류" + error)
            throw error;
        }
    },
    removalReject : async function(reportId, userId) {
        try {
            const removalImagePath = await this.getRemovalImage(reportId, userId);
            await mysql.execute("DELETE FROM reportRemovalRequest WHERE reportId = ? AND USERId = ?", [reportId, userId]);
            await this.deleteImage(removalImagePath);
            console.log(`report: removalReject 완료`)
        } catch (error) {
            console.log("report: removalReject 오류" + error)
            throw error;
        }
    },
    registerAutoReject : async function() {
        // 5일 이상 지난 제보승인요청 자동 거절
        try {
            const [result] = await mysql.execute("SELECT reportId, type, image, USERId, requestedDateTime FROM report WHERE DATE_ADD(requestedDateTime, INTERVAL 5 DAY) < NOW() AND DispStatus = 0");
            for (const report of result) {
                const reportId = report.reportId;
                const type = report.type;
                await this.registerReject(reportId, type);
            }
            console.log(`report: registerAutoReject 완료 : ${result.length}개의 제보 승인요청이 자동 거절되었습니다.`)
            return true;
        } catch (error) {
            console.log("report: registerAutoReject 오류" + error)
            throw error;
        }
    },
    removalAutoReject : async function() {
        // 5일 이상 지난 제보삭제요청 자동 거절
        try {
            const [result] = await mysql.execute("SELECT reportId, USERId, requestedDateTime FROM reportRemovalRequest WHERE DATE_ADD(requestedDateTime, INTERVAL 5 DAY) < NOW()");
            for (const removalRequest of result) {
                const reportId = removalRequest.reportId;
                const userId = removalRequest.USERId;
                await this.removalReject(reportId, userId);
            }
            console.log(`report: removalAutoReject 완료 : ${result.length}개의 제보 삭제요청이 자동 거절되었습니다.`)
            return true;
        } catch (error) {
            console.log("report: removalAutoReject 오류" + error)
            throw error;
        }
    },
    removalAutoApprove: async function() {
        try {
            // 제보 삭제 요청 목록을 가져옵니다.
            const [removalRequests] = await this.getManagerDeleteReportList();
    
            // 각 삭제 요청에 대해 처리합니다.
            for (const request of removalRequests) {
                const reportId = request.reportId;
                const userId = request.USERId;
                const type = request.type;
    
                // 해당 제보에 대해 인근 동일 삭제 요청의 개수를 가져옵니다.
                const [nearbySameRemovalRequests] = await mysql.query(
                    "SELECT COUNT(*) as count FROM reportRemovalRequest WHERE reportId = ? AND USERId != ?",
                    [reportId, userId]
                );
    
                if (nearbySameRemovalRequests) {
                    const numberOfRequests = nearbySameRemovalRequests[0].count;
    
                    // 인근 동일 삭제 요청이 5개 이상인 경우에만 자동 승인 절차를 진행합니다.
                    if (numberOfRequests >= 5) {
                        // 해당 제보 삭제 요청을 자동으로 승인 처리합니다.
                        await this.removalApprove(reportId, userId);
    
                        // 인근 동일 삭제 요청들에 대해서도 자동 승인 처리를 반복합니다.
                        const [restNearbySameRemovalRequests] = await mysql.query(
                            "SELECT USERId FROM reportRemovalRequest WHERE reportId = ? AND USERId != ?",
                            [reportId, userId]
                        );
    
                        for (const restRequest of restNearbySameRemovalRequests) {
                            await this.removalApprove(reportId, restRequest.USERId);
                        }
                    }
                }
            }
            return true;
        } catch (error) {
            console.log("report: removalAutoApprove 오류 발생:", error.message);
            throw error;
        }
    },    
}

module.exports = report;