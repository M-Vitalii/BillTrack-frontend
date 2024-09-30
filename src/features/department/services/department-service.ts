import {Department} from "@/features/department/models";
import {BaseService} from "@/shared/api/base-service.ts";

class DepartmentService extends BaseService<Department> {
    constructor() {
        super("departments");
    }
}

export default new DepartmentService();