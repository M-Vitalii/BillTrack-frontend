import {BaseService} from "@/shared/api/base-service.ts";
import {Employee} from "@/features/employee/models/employee.ts";

class DepartmentService extends BaseService<Employee> {
    constructor() {
        super("employees");
    }
}

export default new DepartmentService();