import { useEffect, useState } from "react";
import Loader from "../components/dashboard/Loader";

const CasosUso = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div>CasosUso</div>
    )
}

export default CasosUso