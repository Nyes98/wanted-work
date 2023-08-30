import Main from './components/main/Component';
import Header from './components/header/Component';
import { Route, Routes } from 'react-router-dom';
import Detail from './components/detail/Component';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/detail" element={<Detail />}></Route>
            </Routes>
        </>
    );
}

export default App;
