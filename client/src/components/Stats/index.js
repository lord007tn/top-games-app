import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
const Stats = () => {
    const [DataByPlaytime, setDataByPlaytime] = useState([]);
    const [DataByPlayers, setDataByPlayers] = useState([]);
    const [Pt_Queries, setPt_Queries] = useState({
        pt_genre: "",
        pt_platform: "",
    });
    const [P_Queries, setP_Queries] = useState({
        p_genre: "",
        p_platform: "",
    });
    useEffect(() => {
        const topGamesByPlayers = async () => {
            const response = await axios.get(
                `http://localhost:8000/games/players?genre=${P_Queries.p_genre}&platform=${P_Queries.p_platform}`
            );
            setDataByPlayers(response.data.games);
        };
        topGamesByPlayers();
    }, [P_Queries]);
    useEffect(() => {
        const topGamesByPlaytime = async () => {
            const response = await axios.get(
                `http://localhost:8000/games/playtime?genre=${Pt_Queries.pt_genre}&platform=${Pt_Queries.pt_platform}`
            );
            setDataByPlaytime(response.data.games);
        };
        topGamesByPlaytime();
    }, [Pt_Queries]);

    const Pt_OnSelect = async (e) => {
        setPt_Queries({ ...Pt_Queries, [e.target.name]: e.target.value });
    };
    const P_OnSelect = async (e) => {
        setP_Queries({ ...P_Queries, [e.target.name]: e.target.value });
    };
    return (
        <div className="container">
            <div className="container-search">
                <select onChange={(e) => Pt_OnSelect(e)} name="pt_genre" id="pt_genre">
                    <option value={""}>---</option>
                    <option value="MOBA">MOBA</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="FPS">FPS</option>
                    <option value="Card Game">Card Game</option>
                    <option value="Sport">Sport</option>
                    <option value="Multiplayer">Multiplayer</option>
                </select>
                <select onChange={(e) => Pt_OnSelect(e)} name="pt_platform" id="pt_platform">
                    <option value={""}>---</option>
                    <option value="PC">PC</option>
                    <option value="Android">Android</option>
                    <option value="PS4">PS4</option>
                    <option value="XBOX">XBOX</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Platforms</th>
                        <th>Genre</th>
                        <th>Total Play Time</th>
                    </tr>
                </thead>
                <tbody>
                    {DataByPlaytime.map((el) => {
                        return (
                            <tr key={nanoid()}>
                                <td>{el.game}</td>
                                <td>
                                    {el.platforms.map((plt) => {
                                        return <div key={nanoid()}>{plt}</div>;
                                    })}
                                </td>
                                <td>{el.genre}</td>
                                <td>{el.totalPlayTime}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="container-search">
                <select onChange={(e) => P_OnSelect(e, "players")} name="p_genre" id="p_genre">
                    <option value={""}>---</option>
                    <option value="MOBA">MOBA</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="FPS">FPS</option>
                    <option value="Card Game">Card Game</option>
                    <option value="Sport">Sport</option>
                    <option value="Multiplayer">Multiplayer</option>
                </select>
                <select onChange={(e) => P_OnSelect(e, "players")} name="p_platform" id="p_platform">
                    <option value={""}>---</option>
                    <option value="PC">PC</option>
                    <option value="Android">Android</option>
                    <option value="PS4">PS4</option>
                    <option value="XBOX">XBOX</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Platforms</th>
                        <th>Genre</th>
                        <th>Total Players</th>
                    </tr>
                </thead>
                <tbody>
                    {DataByPlayers.map((el) => {
                        return (
                            <tr key={nanoid()}>
                                <td>{el.game}</td>
                                <td>
                                    {el.platforms.map((plt) => {
                                        return <div key={nanoid()}>{plt}</div>;
                                    })}
                                </td>
                                <td>{el.genre}</td>
                                <td>{el.totalPlayers}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Stats;
