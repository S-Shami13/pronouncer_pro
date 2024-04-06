import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
    Stack,
    Button,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetVocabularyCollection } from "../ApiRequests";
import { useState } from "react";
import { useEffect } from "react";
import { GetSynonyms, Phonetic, Sentences } from "../mispronunciations/GetSynonyms";
import { TextToSpeech } from "../speechAnalysis/TextToSpeech";


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
            <Stack sx={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'30px 0px' } }>
                
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
                                    <Typography variant='h6' sx={{ color: "#f02e4e" }}>Lissen.</Typography>
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
                                    <Sentences word={word}/>
                                    <TableCell>
                                        <TextToSpeech para={word}/>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{ color: "#000000" }}
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
            </Stack>
        </Stack>
    );
};

export default VocabularyRetentionPage;
