import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export function HomePage() {
    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <Button asChild>
                    <Link to="/login">link to login page</Link>
                </Button>
            </div>
        </div>
    )
}