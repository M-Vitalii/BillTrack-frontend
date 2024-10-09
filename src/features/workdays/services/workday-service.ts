import {BaseService} from "@/shared/api/base-service.ts";
import {Workday} from "@/features/workdays/models/workday.ts";

class WorkdayService extends BaseService<Workday> {
    constructor() {
        super("workdays");
    }
}

export default new WorkdayService();