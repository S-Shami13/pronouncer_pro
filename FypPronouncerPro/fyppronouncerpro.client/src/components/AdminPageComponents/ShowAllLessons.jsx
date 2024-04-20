import { useEffect, useState } from "react";
import { GetAllParaLessonsRequest } from "../../ApiRequests";
import { Typography, Rating } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function ShowAllLessons({filter }) {
    const [lessons, setLessons] = useState([]);

    let filteredData = lessons;
    if (filter === "easy") {
        filteredData = lessons.filter(lesson => lesson.lessonLevel === 1);
    } else if (filter === "medium") {
        filteredData = lessons.filter(lesson => lesson.lessonLevel === 2);
    } else if (filter === "hard") {
        filteredData = lessons.filter(lesson => lesson.lessonLevel === 3);
    }

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await GetAllParaLessonsRequest();
                setLessons(response);
            } catch (error) {
                console.log("Error fetching lessons:", error);
            }
        };

        fetchLessons();
    }, []); 

    return (
        <>
            {filteredData && filteredData.map((lesson, index) => (
                <Link key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit', borderBottom:"1px solid #dddddd", padding:"15px" }}>
                    <Typography variant="h6" sx={{ color:'#565656' } }>{index+1} . {lesson.lessonTitle}</Typography>
                    {lesson.lessonLevel === 1 && <Rating sx={{ color: "#66BB6A" }} icon={<Brightness1Icon />} defaultValue={1} max={1} readOnly />}
                    {lesson.lessonLevel === 2 && <Rating sx={{ color: "#FFA726" }} icon={<Brightness1Icon />} defaultValue={2} max={2} readOnly />}
                    {lesson.lessonLevel === 3 && <Rating sx={{ color: "#EF5350" }} icon={<Brightness1Icon />} defaultValue={3} max={3} readOnly />}

                </Link>
            ))}
        </>
    );
}

ShowAllLessons.propTypes = {
    filter: PropTypes.string.isRequired,
}

export default ShowAllLessons;
