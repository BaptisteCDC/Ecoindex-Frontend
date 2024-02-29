import React, { useState } from 'react';
import { useFeatureFlag } from 'configcat-react';
import Button from '@mui/material/Button';
import { Container } from 'react-bootstrap';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Co2Icon from '@mui/icons-material/Co2';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import GradeIcon from '@mui/icons-material/Grade';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { yellow } from '@mui/material/colors';
import { EcoindexDetail } from '../interface/EcoindexDetail';
import {GetfromLocalStorage, SavetoLocalStorage, ecoIndexRequest} from '../repositories/LocalStorageRepository';
import { PostToEcoindexApi,getEcodindexUrlToPostNewTask,GetFromEcoindexApi } from '../utils/ecoindexutils';
import { Input, TextField } from '@mui/material';


export const EcoIndexComposant: React.FC = () => {
    const [urlToAnalyse, setUrl] = useState('');
    const [detail, setData] = useState<EcoindexDetail>();
    const [error, setError] = useState<string>();
    const [ufToPrint, setUf] = useState<ecoIndexRequest>(GetfromLocalStorage());
    const customColumnStyle = { maxWidth: "1px" };
    const { value: isMyFirstFeatureEnabledValue, loading: isMyFirstFeatureEnabledLoading } = useFeatureFlag("isMyFirstFeatureEnabled", false);
    const { value: isRedWaterEnabledValue, loading: isRedWaterEnabledLoading } = useFeatureFlag("redWater", false);
    const makeRequest = async () => {
            try {
            const response = await PostToEcoindexApi(getEcodindexUrlToPostNewTask(),urlToAnalyse)
            const result = await response.json();
            if (response.status > 200 && response.status < 300) {
                SavetoLocalStorage(result, new Date().toLocaleString(),urlToAnalyse);
                setUf(GetfromLocalStorage())
            }
            else {
                setError(result.error);
            }

        } catch (error) {
            console.error(error);
        }

    };

    const getRequest = async () => {
        try {
            if (ufToPrint?.id_request) {
                console.log(ufToPrint?.id_request)
                const response2 = await GetFromEcoindexApi(getEcodindexUrlToPostNewTask()+ufToPrint?.id_request)
                const result2 = await response2.json();
                if (response2.status !== 425) {
                    console.log(result2)
                    setData(result2.ecoindex_result.detail);
                }
                else {
                    setError("Error : Retour 425 too early to call API");
                }
            }
            else {

                setError("Error : IDrequest not existing in localstorage");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return isMyFirstFeatureEnabledLoading ? (
        <div>Loading...</div>
    ) : (
        <Container className="mt-3">
            <div>
            <TextField id="filled-basic" label="url" variant="filled" onChange={(e) => {
                    setUrl(e.target.value);
                }} />
                </div>
            <div>
                <Button variant="contained" onClick={makeRequest}>Effectuer la requête</Button></div>
                <div>{ufToPrint && <div><b>Functional Unit</b><div>
                    dernière requête : {ufToPrint.date_request} - ID associé : {ufToPrint.id_request}- url associée : {ufToPrint.url_analysed}</div></div>}</div>
            <div>
                <Button variant="contained" onClick={getRequest}>Reccupérer les resultats</Button></div>

            {detail && <div><h2 color="success"><PublicIcon color="success" sx={{ fontSize: 25 }} /> Détails de l'écoindex :</h2><TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={customColumnStyle}></TableCell>
                            <TableCell align="left"><b>key</b></TableCell>
                            <TableCell align="left"><b>value</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={customColumnStyle} align="center">{isMyFirstFeatureEnabledValue ? (<LanguageIcon />) : 1}</TableCell>
                            <TableCell align="left">URL</TableCell>
                            <TableCell align="left">{detail?.url}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={customColumnStyle} align="center">{isMyFirstFeatureEnabledValue ? (<SyncAltIcon />) : 2}</TableCell>
                            <TableCell align="left">Requêtes</TableCell>
                            <TableCell align="left">{detail?.requests} request(s)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={customColumnStyle} align="center">{isMyFirstFeatureEnabledValue ? (<GradeIcon sx={{ color: yellow[600] }} />) : 3}</TableCell>
                            <TableCell align="left">Grade</TableCell>
                            <TableCell align="left">{detail?.grade}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={customColumnStyle} align="center">{isMyFirstFeatureEnabledValue ? (<ScoreboardIcon />) : 4}</TableCell>
                            <TableCell align="left">Score</TableCell>
                            <TableCell align="left">{detail?.score}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={customColumnStyle} align="center">{isMyFirstFeatureEnabledValue ? (<Co2Icon color={isRedWaterEnabledValue ? "primary" : "action"} />) : 5}</TableCell>
                            <TableCell align="left">GES</TableCell>
                            <TableCell align="left">{detail?.ges} co2eq</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={customColumnStyle} align="center">{isMyFirstFeatureEnabledValue ? (<WaterDropIcon color="primary" />) : 6}</TableCell>
                            <TableCell align="left">Consommation d'eau</TableCell>
                            <TableCell align="left">{detail?.water} l</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </div>}
            {error && <div color="failed">{error}</div>}
        </Container>
    );
};


