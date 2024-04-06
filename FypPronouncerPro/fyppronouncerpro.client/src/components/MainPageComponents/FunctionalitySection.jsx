import { Stack } from '@mui/material';
import PlaybackSpeedSelectionMenu from './PlaybackSpeedSelectionMenu';
import { TextToSpeech } from '../../speechAnalysis/TextToSpeech';
import SpeechToText from '../../speechAnalysis/SpechToText';
import TextComparison from '../../speechAnalysis/TextComparison';
import PropTypes from 'prop-types';
import { useState } from 'react';
function FunctionalitySection({ title, content }) {
    const [speechResult, setSpeechResult] = useState('');
    const handleSpeechRecognitionResult = (result) => {
        setSpeechResult(result);
    }
    return (
        <Stack direction="row" alignItems="center" justifyContent="center">
            <PlaybackSpeedSelectionMenu />
            <TextToSpeech para={content} />
            <SpeechToText onSpeechRecognitionResult={handleSpeechRecognitionResult} showText={false} />
            {speechResult && (<TextComparison originalText={content} spokenText={speechResult} title={title} />)}
        </Stack>
    )
}
FunctionalitySection.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}
export default FunctionalitySection;