var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener("DOMContentLoaded", function () {
    var updatedStudentData = localStorage.getItem("updatedStudent");
    var logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            localStorage.clear(); // Clear all localStorage items
            window.location.href = "index.html";
            return [2 /*return*/];
        });
    }); });
    if (updatedStudentData) {
        try {
            var updatedStudent_1 = JSON.parse(updatedStudentData);
            if (updatedStudent_1 && typeof updatedStudent_1 === "object") {
                console.log("Updated Student Data:", updatedStudent_1);
                var studentInfoDiv_1 = document.getElementById("student-info");
                if (studentInfoDiv_1) {
                    if (updatedStudent_1.courses && updatedStudent_1.courses.length > 0) {
                        studentInfoDiv_1.innerHTML = renderStudentInfo(updatedStudent_1);
                        // Attach event listeners for individual delete actions
                        document.querySelectorAll(".delete-course").forEach(function (button) {
                            button.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
                                var targetRow, courseId_1;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            targetRow = event.target.closest("tr");
                                            if (!targetRow) return [3 /*break*/, 2];
                                            courseId_1 = parseInt(targetRow.getAttribute("data-course-id") || "0", 10);
                                            return [4 /*yield*/, deleteCourse(updatedStudent_1.id, courseId_1)];
                                        case 1:
                                            _b.sent();
                                            updatedStudent_1.courses = (_a = updatedStudent_1.courses) === null || _a === void 0 ? void 0 : _a.filter(function (course) { return course.id !== courseId_1; });
                                            localStorage.setItem("updatedStudent", JSON.stringify(updatedStudent_1)); // Persist changes
                                            studentInfoDiv_1.innerHTML = renderStudentInfo(updatedStudent_1); // Re-render
                                            attachEventListeners(updatedStudent_1); // Re-attach event listeners
                                            _b.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        // Attach event listener for "Delete All Courses" button
                        var deleteAllButton = document.getElementById("delete-all");
                        deleteAllButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                            var success;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, deleteAllCourses(updatedStudent_1.id)];
                                    case 1:
                                        success = _a.sent();
                                        if (success) {
                                            updatedStudent_1.courses = [];
                                            localStorage.setItem("updatedStudent", JSON.stringify(updatedStudent_1)); // Persist changes
                                            studentInfoDiv_1.innerHTML = "\n                  <div class=\"alert alert-warning\" role=\"alert\">\n                    No courses available.\n                  </div>\n                ";
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else {
                        studentInfoDiv_1.innerHTML = "\n              <div class=\"alert alert-warning\" role=\"alert\">\n                No courses available.\n              </div>\n            ";
                    }
                }
                else {
                    console.error("Element with ID 'student-info' not found.");
                }
            }
            else {
                console.error("Parsed data is not a valid object.");
            }
        }
        catch (error) {
            console.error("Failed to parse updated student data:", error);
        }
    }
    else {
        console.warn("No updated student data found in localStorage.");
    }
    function renderStudentInfo(student) {
        if (!student.courses || student.courses.length === 0) {
            return "\n        <div class=\"alert alert-warning\" role=\"alert\">\n          No courses available.\n        </div>\n      ";
        }
        return "\n      <div class=\"card mt-4\">\n        <div class=\"card-body\">\n          <h3 class=\"card-title\">Student Details</h3>\n          <p><strong>Student ID:</strong> ".concat(student.id, "</p>\n          <p><strong>Role Number:</strong> ").concat(student.userId, "</p>\n          <p><strong>Year:</strong> ").concat(student.year, "</p>\n          <p><strong>Department:</strong> ").concat(student.department, "</p>\n          <h4>Registered Courses:</h4>\n          <table class=\"table table-striped table-bordered mt-3\">\n            <thead class=\"thead-dark\">\n              <tr>\n                <th>#</th>\n                <th>Course Name</th>\n                <th>Code</th>\n                <th>Department</th>\n                <th>Year</th>\n                <th>Action</th>\n              </tr>\n            </thead>\n            <tbody>\n              ").concat(student.courses
            .map(function (course, index) { return "\n                  <tr data-course-id=\"".concat(course.id, "\">\n                    <td>").concat(index + 1, "</td>\n                    <td>").concat(course.name || "Unknown Course", "</td>\n                    <td>").concat(course.code || "Unknown Code", "</td>\n                    <td>").concat(course.department || "Unknown Department", "</td>\n                    <td>").concat(course.year || "N/A", "</td>\n                    <td>\n                      <span class=\"text-danger delete-course\" style=\"cursor: pointer;\">Delete</span>\n                    </td>\n                  </tr>"); })
            .join(""), "\n            </tbody>\n          </table>\n          <button id=\"delete-all\" class=\"btn btn-danger mt-3\">Delete All Courses</button>\n        </div>\n      </div>\n    ");
    }
    function attachEventListeners(student) {
        var _this = this;
        document.querySelectorAll(".delete-course").forEach(function (button) {
            button.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
                var targetRow, courseId_2, studentInfoDiv;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            targetRow = event.target.closest("tr");
                            if (!targetRow) return [3 /*break*/, 2];
                            courseId_2 = parseInt(targetRow.getAttribute("data-course-id") || "0", 10);
                            return [4 /*yield*/, deleteCourse(student.id, courseId_2)];
                        case 1:
                            _b.sent();
                            student.courses = (_a = student.courses) === null || _a === void 0 ? void 0 : _a.filter(function (course) { return course.id !== courseId_2; });
                            localStorage.setItem("updatedStudent", JSON.stringify(student)); // Persist changes
                            studentInfoDiv = document.getElementById("student-info");
                            if (studentInfoDiv) {
                                studentInfoDiv.innerHTML = renderStudentInfo(student); // Re-render
                                attachEventListeners(student); // Re-attach event listeners
                            }
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        });
        var deleteAllButton = document.getElementById("delete-all");
        if (deleteAllButton) {
            deleteAllButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var success, studentInfoDiv;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, deleteAllCourses(student.id)];
                        case 1:
                            success = _a.sent();
                            if (success) {
                                student.courses = [];
                                localStorage.setItem("updatedStudent", JSON.stringify(student)); // Persist changes
                                studentInfoDiv = document.getElementById("student-info");
                                if (studentInfoDiv) {
                                    studentInfoDiv.innerHTML = "\n              <div class=\"alert alert-warning\" role=\"alert\">\n                No courses available.\n              </div>\n            ";
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    }
    function deleteCourse(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function () {
            var token, BASE_URL, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = localStorage.getItem("accessToken");
                        BASE_URL = "http://localhost:4000";
                        return [4 /*yield*/, fetch("".concat(BASE_URL, "/student/").concat(studentId, "/courses/").concat(courseId), {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to delete course with ID ".concat(courseId));
                        }
                        console.log("Course with ID ".concat(courseId, " deleted successfully."));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error deleting course:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function deleteAllCourses(studentId) {
        return __awaiter(this, void 0, void 0, function () {
            var token, BASE_URL, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = localStorage.getItem("accessToken");
                        BASE_URL = "http://localhost:4000";
                        return [4 /*yield*/, fetch("".concat(BASE_URL, "/student/").concat(studentId, "/courses"), {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to delete all courses for student ID ".concat(studentId));
                        }
                        console.log("All courses for student ID ".concat(studentId, " deleted successfully."));
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error deleting all courses:", error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
});
