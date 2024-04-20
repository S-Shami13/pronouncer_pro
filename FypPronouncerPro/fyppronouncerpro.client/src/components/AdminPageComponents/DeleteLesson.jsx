import { Typography, Stack, InputAdornment, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function DeleteLesson() {
    return (
        <Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginBottom: '10px' }}>
                <Typography variant="h4">Delete Lesson</Typography>
                <TextField
                    label="Search with title.."
                    type="text"
                    name="email"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <DeleteIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
        </Stack>
    );
}
export default DeleteLesson;