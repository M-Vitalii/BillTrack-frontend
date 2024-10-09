import {useEntityData} from "@/hooks/use-entity-data.ts";
import {Workday} from "@/features/workdays/models/workday.ts";
import {workdaySchema} from "@/features/workdays/schemas/workday-schema.ts";
import WorkdayService from "@/features/workdays/services/workday-service.ts";

export const useWorkdays = () => useEntityData<Workday, typeof workdaySchema>(WorkdayService, 'Workday');