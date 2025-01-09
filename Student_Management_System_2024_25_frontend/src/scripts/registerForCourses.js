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
// Get elements from the form
var courseSearchField = document.getElementById("course-search");
var departmentSelect = document.getElementById("department");
var yearSelect = document.getElementById("year");
var semesterSelect = document.getElementById("semester");
var registerButton = document.getElementById("register");
var logoutButton = document.getElementById("logout");
var userId = localStorage.getItem("userId");
logoutButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('studentId');
        localStorage.removeItem('updatedStudent');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
        return [2 /*return*/];
    });
}); });
// Event listener for the Register button to get courses by department, year, and semester
registerButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var department, year, semester, courses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                department = departmentSelect.value;
                year = yearSelect.value;
                semester = semesterSelect.value;
                if (!(department && year && semester)) return [3 /*break*/, 2];
                return [4 /*yield*/, getCoursesByDepartmentYearSemester(department, year, semester)];
            case 1:
                courses = _a.sent();
                if (courses) {
                    console.log(courses);
                    displayCourseTable(courses);
                }
                else {
                    alert("No courses found for the selected filters.");
                }
                return [3 /*break*/, 3];
            case 2:
                alert("Please select a department, year, and semester.");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// Function to fetch courses by department, year, and semester
var getCoursesByDepartmentYearSemester = function (department, year, semester) { return __awaiter(_this, void 0, void 0, function () {
    var BASE_URL, response, courseData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BASE_URL = "http://localhost:4000";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/courses/getCourses/").concat(year, "/").concat(semester, "/").concat(department))];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    console.error("No courses found for the selected filters.");
                    return [2 /*return*/, null];
                }
                return [4 /*yield*/, response.json()];
            case 3:
                courseData = _a.sent();
                return [2 /*return*/, courseData.courseNames];
            case 4:
                error_1 = _a.sent();
                console.error("Error fetching courses:", error_1);
                return [2 /*return*/, null];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Function to display course details in a table
// Function to display course details in a table with roll numbers
// Function to display course details in a table with roll numbers and a register button
var displayCourseTable = function (courses) {
    var tableContainer = document.getElementById("course-table-container");
    if (!tableContainer) {
        console.error("Table container not found!");
        return;
    }
    // Ensure we're working with an array
    var coursesArray = Array.isArray(courses) ? courses : [];
    tableContainer.innerHTML = "";
    if (coursesArray.length === 0) {
        tableContainer.innerHTML = "<p>No courses found.</p>";
        return;
    }
    var table = document.createElement("table");
    table.classList.add("table", "table-striped");
    var tableHeader = document.createElement("thead");
    tableHeader.innerHTML = "\n      <tr>\n        <th>Roll No.</th>\n        <th>Course Name</th>\n        <th>Select</th>\n      </tr>\n    ";
    table.appendChild(tableHeader);
    var tableBody = document.createElement("tbody");
    coursesArray.forEach(function (course, index) {
        var row = document.createElement("tr");
        var rollNumberCell = document.createElement("td");
        rollNumberCell.textContent = (index + 1).toString(); // Add roll number
        row.appendChild(rollNumberCell);
        var nameCell = document.createElement("td");
        nameCell.textContent = course;
        row.appendChild(nameCell);
        var selectCell = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("course-checkbox");
        checkbox.value = course;
        selectCell.appendChild(checkbox);
        row.appendChild(selectCell);
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    tableContainer.appendChild(table);
    // Add "Register for Selected Courses" button
    var registerCoursesButton = document.createElement("button");
    registerCoursesButton.textContent = "Register for Selected Courses";
    registerCoursesButton.classList.add("btn", "btn-primary", "mt-3");
    registerCoursesButton.style.float = "right";
    tableContainer.appendChild(registerCoursesButton);
    // Add event listener to the register button
    registerCoursesButton.addEventListener("click", function () {
        var selectedCourses = [];
        var checkboxes = document.querySelectorAll(".course-checkbox");
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedCourses.push(checkbox.value);
            }
        });
        if (selectedCourses.length > 0) {
            console.log(selectedCourses);
            registerSelectedCourses(selectedCourses);
        }
        else {
            alert("No courses selected. Please select at least one course.");
        }
    });
};
// Function to register selected courses
var registerSelectedCourses = function (courses) { return __awaiter(_this, void 0, void 0, function () {
    var BASE_URL, token, studentId, response, responseData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BASE_URL = "http://localhost:4000";
                token = localStorage.getItem("accessToken");
                studentId = localStorage.getItem("studentId");
                console.log("i am logging the course", courses, studentId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/student/add-courses"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify({ studentId: Number(studentId), courseNames: courses }),
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                responseData = _a.sent();
                console.log(responseData.updatedStudent);
                localStorage.setItem("updatedStudent", JSON.stringify(responseData.updatedStudent));
                alert("Successfully registered for selected courses!");
                window.location.href = 'myCourses.html';
                return [3 /*break*/, 5];
            case 4:
                console.error("Failed to register for courses.");
                alert("Error occurred while registering for courses. Please try again.");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error("Error registering courses:", error_2);
                alert("Error occurred while registering for courses. Please try again.");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
