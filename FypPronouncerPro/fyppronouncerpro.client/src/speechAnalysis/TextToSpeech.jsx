
import PropTypes from 'prop-types';
import { IconButton, Tooltip, Zoom } from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import { useSpeechSynthesis } from "react-speech-kit";
import { useState, useEffect } from 'react';

export const TextToSpeech = ({ para }) => {
    const { speak, cancel, speaking } = useSpeechSynthesis();

    const [isActiveHearing, setActiveHearing] = useState(false);

    const handleToggleHearing = () => {

        setActiveHearing(!isActiveHearing);

        if (isActiveHearing === true) {
            speak({
                text: para, rate: ".7"
            });
        }

        if (isActiveHearing === false) {
            cancel();
        }
    };

    return (
        <Tooltip title="Double Click" arrow TransitionComponent={Zoom}>
            <IconButton
                className={speaking && "ZoomAnimation"}
                onClick={handleToggleHearing}
                sx={{ color: "#f02e4e" }}
            >
                <HearingIcon fontSize="large" />
            </IconButton>
        </Tooltip>
        
    );
};


export const WordToSpeech = ({ word }) => {
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const [isActiveHearing, setActiveHearing] = useState(false);

    useEffect(() => {
        if (isActiveHearing) {
            speak({
                text: word, rate: ".7"
            });
        } else {
            cancel();
        }
    }, [isActiveHearing, speak, cancel, word]);

    const handleToggleHearing = () => {
        setActiveHearing((prevIsActive) => !prevIsActive);
    };

    return (
        <Tooltip title="Lissen" arrow TransitionComponent={Zoom}>
            <button
                style={{ padding: '10px', fontSize: '18px', background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'Manrope' }}
                onClick={handleToggleHearing}
                className={speaking && "ZoomAnimation"}>
                {word}
            </ button>
        </Tooltip>
       
    );
}

TextToSpeech.propTypes = {
    para: PropTypes.string.isRequired,
};

WordToSpeech.propTypes = {
    word: PropTypes.string.isRequired,
}

