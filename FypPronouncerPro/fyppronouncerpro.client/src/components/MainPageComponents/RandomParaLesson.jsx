import {
    Stack,
    Typography,
    Paper,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Box
} from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaybackSpeedSelectionMenu from "./PlaybackSpeedSelectionMenu";
import { TextToSpeech, WordToSpeech } from "../../speechAnalysis/TextToSpeech";
import SaveIcon from '@mui/icons-material/Save';
import SpeechToText from "../../speechAnalysis/SpechToText";
import { SaveWordInVocabulary, TextComparisonRequest } from "../../ApiRequests";

function RandomParaLesson() {
    const params = useParams();
    const [speed, setSpeed] = useState(0.7);
    const [comparison, setComparison] = useState(null);
    const [speechResult, setSpeechResult] = useState('');
    const [what, setWhat] = useState([]);
    const [how, setHow] = useState([]);

    const handleSpeedSelection = (result) => {
        setSpeed(result);
    };

    const handleSpeechRecognitionResult = (result) => {
        setSpeechResult(result);
    };

    const compareTexts = async () => {
        try {
            const data = {
                OriginalString: params.content,
                SpokenString: speechResult,
            };
            setComparison(data);
            const response = await TextComparisonRequest(data);
            if (response) {
                const mispronunciations = response.mispronunciations;
                const splitMispronunciations = mispronunciations.map(pair => pair.split(', '));
                const wordsArray1 = splitMispronunciations.map(words => words[0]);
                const wordsArray2 = splitMispronunciations.map(words => words[1]);
                setWhat(wordsArray1);
                setHow(wordsArray2);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveWordInVocabulary = (word) => {
        SaveWordInVocabulary({
            userEmail: localStorage.email,
            Word: word,
        });
    }

    return (
        <>
            <Stack sx={{ padding: { md: '50px', xs: '20px' }, display: 'flex', flexDirection: 'column' }}>
                <Stack sx={{ display: 'flex', flexDirection: "row", my: 4 }}>
                    <Paper sx={{ padding: "30px", marginRight: 3, height: "fit-content" }}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontFamily: 'comfortaa',
                                textAlign: 'center',
                                marginBottom: { md: 2, xs: 0 },
                                color: "#f02e4e",
                                letterSpacing: { md: '3px', xs: "1px" },
                            }}
                        >
                            Random Paragraph Lesson
                        </Typography>
                        <Typography
                            component="p"
                            variant="h6"
                            sx={{
                                fontFamily: "Manrope",
                                marginBottom: { md: 2, xs: 0 },
                                color: '#030a1b',
                                textAlign: "justify",
                                lineHeight: "2.2",
                                letterSpacing: "1.5px",
                                borderBottom: "2px solid #030a1b",
                            }}
                        >
                            {params.content}
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            <PlaybackSpeedSelectionMenu onSpeedSelection={handleSpeedSelection} />
                            <TextToSpeech para={params.content} speed={speed} />
                            <SpeechToText onSpeechRecognitionResult={handleSpeechRecognitionResult} showText={false} />
                            {speechResult && (
                                <IconButton onClick={compareTexts} sx={{ color: "#f02e4e" }}>
                                    <BugReportIcon fontSize="large" />
                                </IconButton>
                            )}
                        </Stack>
                    </Paper>
                </Stack>
                {comparison && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {what.map((word, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                                                <div>
                                                    <Typography sx={{ color: "#f02e4e", textTransform: 'capitalize' }} variant="h6" display="inline-block">
                                                        <WordToSpeech word={word} />
                                                    </Typography>
                                                    <IconButton onClick={() => handleSaveWordInVocabulary(word)} sx={{ color: "#f02e4e" }}>
                                                        <SaveIcon />
                                                    </IconButton>
                                                </div>
                                            </Box>
                                            <Typography sx={{ textTransform: "lowercase", color: "#595959 " }}>
                                                {how[index] === ' ' ? "Did not speak" : `said '${how[index]}' instead of '${word}'`}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Stack>
            
        </>
    );
}

export default RandomParaLesson;
