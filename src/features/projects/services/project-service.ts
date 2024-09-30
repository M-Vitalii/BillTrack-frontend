import {Project} from "@/features/projects/models";
import {BaseService} from "@/shared/api/base-service.ts";

class ProjectService extends BaseService<Project> {
    constructor() {
        super("projects");
    }
}

export default new ProjectService();
