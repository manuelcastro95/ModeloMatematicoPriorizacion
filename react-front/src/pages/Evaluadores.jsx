import React, { useEffect, useState } from 'react'
import Loader from '../components/dashboard/Loader';

const Evaluadores = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div>Evaluadores</div>
    )
}

export default Evaluadores