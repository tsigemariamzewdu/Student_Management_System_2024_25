// app.ts
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
// Fetch courses data from the API
var fetchCourses = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, courses, coursesTableBody_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('http://localhost:4000/admin/courses')];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                courses = _a.sent();
                coursesTableBody_1 = document.getElementById('coursesTableBody');
                coursesTableBody_1.innerHTML = ''; // Clear any existing rows
                courses.forEach(function (course) {
                    var row = document.createElement('tr');
                    row.innerHTML = "\n          <td>".concat(course.name, "</td>\n          <td>").concat(course.code, "</td>\n          <td>").concat(course.department, "</td>\n          <td>").concat(course.year, "</td>\n          <td>").concat(course.semester, "</td>\n          <td>\n            <button class=\"btn btn-warning\" onclick=\"updateCourse(").concat(course.id, ")\">Update</button>\n            <button class=\"btn btn-danger\" onclick=\"deleteCourse(").concat(course.id, ")\">Delete</button>\n          </td>\n        ");
                    coursesTableBody_1.appendChild(row);
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('There was an error fetching the courses:', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Handle add new course action
var addCourse = function () {
    // Redirect to the add course form or show a modal
    console.log('Redirecting to add new course form');
};
// Handle update course action
var updateCourse = function (courseId) {
    // Redirect to the update form with the course data
    console.log("Redirecting to update course ".concat(courseId));
    window.location.href = "updateCourse.html";
};
// Handle delete course action
var deleteCourse = function (courseId) { return __awaiter(_this, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:4000/admin/courses/".concat(courseId), {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Failed to delete course');
                }
                alert('Course deleted successfully');
                fetchCourses(); // Refresh the course list
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('There was an error deleting the course:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Set up event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    var logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.clear();
                window.location.href = 'index.html';
                return [2 /*return*/];
            });
        }); });
    }
    // Fetch courses on initial load
    fetchCourses();
    // Add event listener for add new course button
    var addCourseBtn = document.getElementById('addCourseBtn');
    addCourseBtn.addEventListener('click', addCourse);
});
