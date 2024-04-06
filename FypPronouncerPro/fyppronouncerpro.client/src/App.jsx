import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './pages/FirstPage';
import DemoPage from './pages/DemoPage';
import MainPage from './pages/MainPage';
import SoloParaLesson from './components/MainPageComponents/SoloParaLesson';
import LayoutComponent from './components/MainPageComponents/LayoutComponent';
import VocabularyRetentionPage from './pages/VocabularyRetentionPage';
import SoloAudioLesson from './components/MainPageComponents/SoloAudioLesson';
function App() {

    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<FrontPage />} />
                    </Route>
                    <Route path="demo_page" element={<DemoPage />} />
                    <Route path="main_page" element={<LayoutComponent />} >
                        <Route index element={<MainPage />} />
                        <Route path="solo_para_lesson/:title/:content/:level/:focusWords" element={<SoloParaLesson />} />
                        <Route path="solo_audio_lesson" element={<SoloAudioLesson />} />
                        <Route path="vocabulary_retention_page" element={<VocabularyRetentionPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
         
    );
}
export default App;