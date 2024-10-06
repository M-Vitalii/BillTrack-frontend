import {useState} from "react";
import {BaseCombobox} from "@/components/combobox/BaseCombobox.tsx";
import {useProjects} from "@/features/projects/hooks/use-projects.ts";
import {Label} from "@/components/ui/label.tsx";

interface ProjectComboboxProps {
    onSelect: (value: string | undefined) => void;
    labelText?: string;
}

export const ProjectCombobox = ({onSelect, labelText}: ProjectComboboxProps) => {
    const {entities: projects} = useProjects();
    const [selectedProject, setSelectedProject] = useState<string | undefined>("");

    const items = projects.items.map(proj => ({
        value: proj.id!,
        label: proj.name
    }));

    const handleSelect = (value: string | undefined) => {
        setSelectedProject(value);
        onSelect(value);
    };

    return (
        <div className="flex flex-col justify-between">
            {labelText ?? (<Label>{labelText}</Label>)}
            <BaseCombobox
                items={items}
                placeholder="Select project"
                value={selectedProject}
                onSelect={handleSelect}
            />
        </div>
    );
};
