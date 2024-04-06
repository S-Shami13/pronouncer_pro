import {
    InputBase,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import GetPhonetic from "../../mispronunciations/GetPhonetic";
import SpeechToText from "../../speechAnalysis/SpechToText";
import { TextToSpeech } from "../../speechAnalysis/TextToSpeech";
import SaveIcon from '@mui/icons-material/Save';
import { SaveWordInVocabulary } from "../../ApiRequests";

const Search = styled("div")(({ theme }) => ({
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(20px)",
    color: "black",
    margin: "15px",
    width: { md: "100%", xs: "80%" },
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#474747",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "30ch",
            "&:focus": {
                width: "50ch",
            },
        },
    },
}));

function RandomWordPronunciation() {

    const [speechResult, setSpeechResult] = useState('');
    const handleSpeechRecognitionResult = (result) => {
        setSpeechResult(result);
    }

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [searchText, setSearchText] = useState("");

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value.trim();
        const words = inputValue.split(' ');
        if (words.length > 1) {
            event.preventDefault();
            return;
        }
        setSearchText(inputValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setIsDialogOpen(true);
        }
    };

    const handleSaveWordInVocabulary = () => {
        if (searchText) {
            SaveWordInVocabulary({
                userEmail: localStorage.email,
                Word: searchText,
            });
        }
    }

    useEffect(() => {
        const cleanSpeechResult = speechResult.replace(/[^\w\s]|_/g, "").toLowerCase();
        const cleanWord = searchText.replace(/[^\w\s]|_/g, "").toLowerCase();

        if (cleanSpeechResult === cleanWord) {
            handleClose();
        }
    }, [speechResult, searchText]);
    return (
        <>
            <Search>
                <IconButton sx={{ color: "#474747" }} onClick={() => setIsDialogOpen(true)}>
                    <SearchIcon />
                </IconButton>
                <StyledInputBase
                    placeholder="Search Random Word"
                    inputProps={{
                        "aria-label": "search",
                        value: searchText,
                        onChange: handleSearchInputChange,
                        onKeyDown: handleKeyPress
                    }}
                />
            </Search>
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onClose={handleClose} sx={{ margin: { md: "30px", xs: '10px' } }}>
                    <DialogActions sx={{ margin: "0" }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                    <DialogTitle>
                        <GetPhonetic word={searchText} />
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', alignItems:'center', justifyContent:'center',}}>
                        <SpeechToText onSpeechRecognitionResult={handleSpeechRecognitionResult} showText={true} />
                        <TextToSpeech para={searchText} />
                        <IconButton onClick={handleSaveWordInVocabulary} sx={{ mx: 3, color: "#f02e4e" }}>
                                 <SaveIcon fontSize="large"/>
                        </IconButton>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
export default RandomWordPronunciation