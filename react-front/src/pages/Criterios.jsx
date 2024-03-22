import React, { useEffect, useState } from 'react'
import Loader from '../components/dashboard/Loader';
const Criterios = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div>Criterios</div>
    )
}

export default Criterios