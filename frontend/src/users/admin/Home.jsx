// import '.../css/Admin.css';

import { useEffect, useState } from 'react';


export default function Home(){
    const [dashboardData, setDashboardData] = useState({ userCount: 0, totalSales: 0 });

    useEffect(() => {
        // Fetch admin dashboard data from API
        setDashboardData({ userCount: 100, totalSales: 50000 });
    }, []);
    return(
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <p>Total Users: {dashboardData.userCount}</p>
            <p>Total Sales: ${dashboardData.totalSales}</p>
        </div>
    )
}