import AdminTopBar from '../components/AdminPageComponents/AdminTopBar';
import { Outlet } from 'react-router-dom';
import { Paper, Container, Typography, Box } from '@mui/material';
import ShowAllLessons from '../components/AdminPageComponents/ShowAllLessons';
import FilterLessons from '../components/AdminPageComponents/FilterLessons';
import { useEffect, useState } from 'react';
function AdminPage() {
    const [filterOption, setFilterOption] = useState(null);
    const handleFilterClick = (result) => {
        setFilterOption(result);
    }
    useEffect(() => {
        console.log(filterOption);
    }, [filterOption])
    return (
        <>
            <AdminTopBar />
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginTop:'20px' }}>
                <Paper sx={{ width: '30%', borderRadius:'5px'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#2196f3', padding: '10px 15px', borderRadius: '5px 5px 0px 0px' }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', color: '#f2f5fa' }}>All Lesson</Typography>
                        <FilterLessons onFilterClick={handleFilterClick} />
                    </Box>
                    <ShowAllLessons filter={filterOption} />
                </Paper>
                <Paper sx={{ width: '60%', padding: '50px', height: 'fit-content' }}>
                    <Outlet />
                </Paper>
            </Container>

        </>
    );
}
export default AdminPage;