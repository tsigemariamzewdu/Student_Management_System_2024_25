// Function to fetch students from the backend API
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
function fetchStudents(department, year) {
    return __awaiter(this, void 0, void 0, function () {
        var yearParam, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    yearParam = year ? Number(year) : "";
                    console.log(yearParam);
                    return [4 /*yield*/, fetch("http://localhost:4000/admin/students?department=".concat(department, "&year=").concat(yearParam))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch students');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    populateStudentTable(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching students:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to populate the student table with fetched data
function populateStudentTable(students) {
    var _this = this;
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
    var tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = ''; // Clear the table before repopulating
    if (students.length === 0) {
        var noDataRow = document.createElement("tr");
        noDataRow.innerHTML = "<td colspan=\"4\" class=\"text-center\">No students found</td>";
        tableBody.appendChild(noDataRow);
    }
    else {
        students.forEach(function (student) {
            var row = document.createElement("tr");
            row.innerHTML = "\n        <td>Student ".concat(student.userId, "</td>\n        <td>").concat(student.userId, "@example.com</td> <!-- For demo, replace with actual email if needed -->\n        <td>").concat(student.department, "</td>\n        <td>").concat(student.year, "</td>\n      ");
            tableBody.appendChild(row);
        });
    }
}
// Function to handle filtering
function filterStudents() {
    var department = document.getElementById("department").value;
    var year = document.getElementById("year").value;
    if (department || year) {
        fetchStudents(department, year); // Pass year as a string from the form
    }
    else {
        alert('Please select at least one filter');
    }
}
// Initial population of the student table
// Optionally, you could fetch all students when the page loads
fetchStudents("", ""); // Fetch all students on page load
