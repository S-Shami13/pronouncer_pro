import { Typography, Stack, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
function EditLesson() {
    const [lessonData, setLessonData] = useState({
        lessonTitle: '',
        lessonContent: '',
        lessonLevel: '',
        focusWords: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'focusWords') {
            const wordsArray = value.split(',');
            setLessonData({ ...lessonData, [name]: wordsArray });
        } else {
            setLessonData({ ...lessonData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(lessonData);
    };
    return (
        <Stack>
            <Stack sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:"space-between", marginBottom:'10px'}}>
                <Typography variant="h4">Edit Lesson</Typography>
                <TextField
                    label="Search with title.."
                    type="text"
                    name="email"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Title"
                    type="text"
                    name="lessonTitle"
                    value={lessonData.lessonTitle}
                    onChange={handleChange}
                    required
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Content"
                    type="text"
                    name="lessonContent"
                    value={lessonData.lessonContent}
                    onChange={handleChange}
                    required
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Focus Words"
                    type="text"
                    name="focusWords"
                    value={lessonData.focusWords.join(',')} // Join the array into a string for display
                    onChange={handleChange}
                    required
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Level"
                    type="number"
                    name="lessonLevel"
                    value={lessonData.lessonLevel}
                    onChange={handleChange}
                    required
                />
                <input
                    style={{
                        background: '#2196f3',
                        padding: '10px',
                        width: '100%',
                        border: 'none',
                        color: '#ffffff',
                        letterSpacing: '2px',
                        fontSize: '18px',
                        borderRadius: '5px'
                    }}
                    type="submit"
                    value="Create"
                    required
                />
            </form>
           
        </Stack>
    );
}
export default EditLesson;