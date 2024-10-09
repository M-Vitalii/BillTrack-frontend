import {SelectEntity} from "@/components/select/SelectEntity.tsx";
import {Project} from "@/features/projects/models";
import {useProjects} from "@/features/projects/hooks/use-projects.ts"; // Import the reusable SelectEntity component

interface SelectProjectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
}

export function SelectProject({
   value,
   onValueChange,
   placeholder = "Select project",
}: SelectProjectProps) {
    const {entities} = useProjects();

    return (
        <SelectEntity<Project>
            items={entities.items}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            renderItem={(project) => `${project.name}`}
            getItemValue={(project) => project.id!}
            label="Projects"
        />
    );
}
