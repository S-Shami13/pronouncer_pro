import {
    Table,
    TableBody,
    TableCell,
    Paper,
    TableContainer,
    TableRow,
    Stack,
    Button,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RepeatIcon from '@mui/icons-material/Repeat';
import { GetVocabularyCollection } from "../ApiRequests";
import { useState } from "react";
import { useEffect } from "react";
import { GetSynonyms, Phonetic, Sentences } from "../mispronunciations/GetSynonyms";


const VocabularyRetentionPage = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetVocabularyCollection(localStorage.email);
                setWords(response.map(item => item.word));
            } catch (error) {
                console.error("Error fetching vocabulary", error);
            }
        };
        fetchData();
    }, []);
    return (
        <Stack
            className="VocabularyPageBackground"
        >
            <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '30px 50px' }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        fontFamily: 'comfortaa',
                        marginBottom: { md: 2, xs: 0 },
                        color: "#f02e4e",
                        letterSpacing: { md: '3px', xs: "1px" },
                    }}
                >
                    My Words Collection
                </Typography>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Sr.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Word.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Phonetic.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Synonyms.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Example Sentence.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Practice.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={{ color: "#f02e4e" }}>Delete.</Typography>
                                    </TableCell>
                                </TableRow>
                                {words.map((word, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            align="center"
                                        >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Typography >{word.toUpperCase()}</Typography>
                                        </TableCell>
                                        <GetSynonyms word={word} />
                                        <Phonetic word={word} />
                                        <Sentences word={word} />
                                        <TableCell>
                                            <Button
                                                color="primary"
                                                disableElevation
                                                disableRipple
                                            >
                                                <RepeatIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                color="primary"
                                                disableElevation
                                                disableRipple
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
               
            </Stack>
        </Stack>
    );
};

export default VocabularyRetentionPage;
