"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { CompassIcon, CaretLeftIcon, CaretRightIcon, MagnifyingGlassIcon, StarIcon, InfoIcon, SoccerBallIcon, FootprintsIcon } from "@phosphor-icons/react";
import PlayerStatsSVGChart from "@/components/graphs/PlayerStatsChart"; 


interface ApiTeam { name: string; slug: string; image_url: string; }
interface ApiStatisticDetail { [key: string]: any; }
interface ApiPercentileDetail { statistic: string; per90: string; percentile: number; }
interface ApiStatistic { year: number; stats: ApiStatisticDetail; percentiles: ApiPercentileDetail[]; }
interface ApiMatchPerformance { rating: number; sections: { summary: { Age: string; Goals: number; Assists: number; Nation: string; }; }; }
interface ApiMatchHistory { date: string; home_team: string; home_team_image_url: string; away_team: string; away_team_image_url: string; score: string; player_performance: ApiMatchPerformance; }
interface ApiPlayerData { id: number; name: string; position: string; market_value: number; profile_image: string; current_team: ApiTeam; statistics: ApiStatistic[]; match_history: ApiMatchHistory[]; }


interface PlayerInfo { name: string; description: string; image: string; flag: string; stats: { labels: string[]; data: number[] }; currentTeam: { name: string; image_url: string }; }
interface SeasonStatsData { competition: string; competitionLogo: string; minutesPlayed: number; goals: number; assists: number; rating: number; matches: number; xG: number; xA: number; yellowCards: number; redCards: number; }
type StatRank = "top" | "average" | "low";
interface DetailedStat { label: string; value: number | string; rank?: StatRank; }
interface StatCategory { title: string; stats: DetailedStat[]; }


const SearchBar: React.FC = () => ( <div className="relative mb-6"> <MagnifyingGlassIcon size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-lines" /> <input type="text" placeholder="Buscar" className="w-full h-12 bg-transparent border border-lines rounded-lg text-light pl-12 outline-none" /> </div> );
const PlayerCard: React.FC<{ player: PlayerInfo }> = ({ player }) => ( <div className="flex flex-col md:flex-row gap-4"> <img src={player.image} alt={`Foto de ${player.name}`} className="cursor-pointer rounded-lg w-full md:w-[145px] h-[320px] object-cover" /> <div className="flex flex-col gap-2 flex-1"> <div className="bg-dark p-3 rounded-lg"> <div className="flex gap-2 items-center mb-1"> <p className="text-lg font-bold text-light">{player.name}</p> <img src={player.flag} alt="Bandeira do país" className="size-4 object-contain" /> </div> <p className="text-sm text-light">{player.description}</p> </div> <div className="bg-dark p-4 rounded-lg flex-1 relative group"> <div className="absolute top-2 right-2 z-10"> <InfoIcon size={18} className="text-light cursor-pointer" /> <div className="absolute bottom-full -right-2 mb-2 w-60 p-2 bg-black border border-lines text-light text-center text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"> Gráfico percentil comparando o jogador com outros da mesma posição. </div> </div> <div className="mt-3"></div> {PlayerStatsSVGChart && <PlayerStatsSVGChart labels={player.stats.labels} data={player.stats.data} />} </div> </div> </div> );
const MatchCard: React.FC<{ match: ApiMatchHistory, playerTeamName: string }> = ({ match, playerTeamName }) => { const getRatingColor = (r: number): string => { if (r < 6) return "bg-red-500"; if (r < 7) return "bg-yellow-500"; if (r < 8) return "bg-green-500"; if (r >= 8) return "bg-blue-500"; return "bg-gray-400"; }; const goals = match.player_performance?.sections?.summary?.Goals ?? 0; const assists = match.player_performance?.sections?.summary?.Assists ?? 0; const rating = match.player_performance?.rating ?? 0; const [homeScore, awayScore] = match.score.split("–").map(s => parseInt(s.trim(), 10)); const playerOnHomeTeam = match.home_team === playerTeamName; const renderPlayerActions = (g: number, a: number) => { const acts = []; if (g > 0) acts.push(<div key="g" className="flex items-center text-green-400 gap-0.5"><span className="font-bold text-xs">{g}</span><SoccerBallIcon size={12} weight="fill" /></div>); if (a > 0) acts.push(<div key="a" className="flex items-center text-blue-400 gap-0.5"><span className="font-bold text-xs">{a}</span><FootprintsIcon size={12} weight="fill" /></div>); return <div className="flex gap-1.5 items-center">{acts}</div>; }; const getScoreTextColor = (s1: number, s2: number) => (s1 > s2 ? "text-white" : "text-light"); return ( <div className="rounded-lg bg-dark text-white w-full h-14 flex items-center justify-between"> <div className="flex flex-col text-center justify-center h-full pl-4 pr-3 border-r border-lines/50"> <p className="text-xs text-light">{new Date(match.date).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit' })}</p> <p className="text-xs text-light">FIM</p> </div> <div className="flex flex-col flex-grow px-4 gap-1"> <div className="flex items-center justify-between"> <div className="flex items-center gap-2"><img src={match.home_team_image_url} alt={`${match.home_team} logo`} className="size-4" /> <p className="text-sm font-medium text-light">{match.home_team}</p></div> <div className="flex items-center gap-2">{playerOnHomeTeam && renderPlayerActions(goals, assists)}<p className={`font-bold text-sm ${getScoreTextColor(homeScore, awayScore)}`}>{homeScore}</p></div> </div> <div className="flex items-center justify-between"> <div className="flex items-center gap-2"><img src={match.away_team_image_url} alt={`${match.away_team} logo`} className="size-4" /> <p className="text-sm font-medium text-light">{match.away_team}</p></div> <div className="flex items-center gap-2">{!playerOnHomeTeam && renderPlayerActions(goals, assists)}<p className={`font-bold text-sm ${getScoreTextColor(awayScore, homeScore)}`}>{awayScore}</p></div> </div> </div> <div className={`flex justify-center items-center h-full w-14 rounded-r-lg ${getRatingColor(rating)}`}> <p className="text-base font-bold text-dark">{rating.toFixed(1)}</p> </div> </div> ); };
const SeasonStatsCard: React.FC<{ stats: SeasonStatsData }> = ({ stats }) => { const StatItem: React.FC<{ value: string | number; label: string }> = ({ value, label }) => ( <div className="text-center"> <p className="text-xl font-bold text-light">{value}</p> <p className="font-bold text-[#5C5C5C]">{label}</p> </div> ); return ( <div className="bg-dark rounded-lg p-4 flex flex-col gap-4"> <div className="flex gap-2 items-center"> <img src={stats.competitionLogo} alt={stats.competition} className="size-6" /> <p className="font-bold text-light">{stats.competition}</p> <p className="text-sm text-light border-l-2 border-lines pl-2">{stats.minutesPlayed} min jogados</p> </div> <div className="grid grid-cols-4 gap-y-4"> <StatItem value={stats.goals} label="Gols" /> <StatItem value={stats.assists} label="Assist" /> <div className="text-center"> <p className="bg-green-500 text-dark font-bold rounded px-2 inline-block mb-1">{stats.rating.toFixed(2)}</p> <p className="font-bold text-[#5C5C5C]">Nota</p> </div> <StatItem value={stats.matches} label="Partidas" /> <StatItem value={stats.xG.toFixed(2)} label="xG" /> <StatItem value={stats.xA.toFixed(2)} label="xA" /> <div className="text-center"> <p className="text-xl font-bold text-light flex items-center justify-center gap-1.5"><span className="block w-3 h-4 bg-yellow-400" />{stats.yellowCards}</p> <p className="font-bold text-[#5C5C5C]">Amarelo</p> </div> <div className="text-center"> <p className="text-xl font-bold text-light flex items-center justify-center gap-1.5"><span className="block w-3 h-4 bg-red-500" />{stats.redCards}</p> <p className="font-bold text-[#5C5C5C]">Vermelho</p> </div> </div> </div> ); };
const DetailedStatsDisplay: React.FC<{ category: StatCategory }> = ({ category }) => ( <div className="flex flex-col gap-2 px-2"> {category.stats.map((stat) => ( <div key={stat.label} className="grid grid-cols-2 items-center gap-4"> <p className="text-sm text-light">{stat.label}</p> <div className="flex items-center gap-3 justify-end"> <p className="font-bold w-14 text-right">{stat.value}</p> {stat.rank && ( <div className="flex w-32 h-2 gap-1"> <div className={`w-1/3 rounded-full ${stat.rank === "low" ? "bg-red-500" : "bg-[#3A3A3A]"}`} ></div> <div className={`w-1/3 rounded-full ${stat.rank === "average" ? "bg-yellow-500" : "bg-[#3A3A3A]"}`} ></div> <div className={`w-1/3 rounded-full ${stat.rank === "top" ? "bg-green-500" : "bg-[#3A3A3A]"}`} ></div> </div> )} </div> </div> ))} </div> );


const transformApiData = (playerData: ApiPlayerData) => {
    const mainStats = playerData.statistics[0]; const percentiles = mainStats.percentiles; const convertPercentileToRank = (p: number): StatRank => { if (p >= 75) return "top"; if (p >= 25) return "average"; return "low"; }; const labelTranslations: { [key: string]: string } = {"Non-Penalty Goals":"Gols s/ Pênalti","npxG: Non-Penalty xG":"xG s/ Pênalti","Shots Total":"Chutes","Assists":"Assist.","xAG: Exp. Assisted Goals":"xA","npxG + xAG":"npxG + xA","Shot-Creating Actions":"Ações p/ Chute","Passes Attempted":"Passes Tentados","Pass Completion %":"% Passes Certos","Progressive Passes":"Passes Progressivos","Progressive Carries":"Conduções Progressivas","Successful Take-Ons":"Dribles","Touches (Att Pen)":"Toques (Área Of.)","Progressive Passes Rec":"Passes Prog. Recebidos",Tackles:"Desarmes",Interceptions:"Interceptações",Blocks:"Bloqueios",Clearances:"Cortes","Aerials Won":"Duelos Aéreos"}; const categoryMapping: { [key: string]: string } = {"Non-Penalty Goals":"Shooting","npxG: Non-Penalty xG":"Shooting","Shots Total":"Shooting",Assists:"Passing","xAG: Exp. Assisted Goals":"Passing","npxG + xAG":"Passing","Shot-Creating Actions":"Passing","Passes Attempted":"Passing","Pass Completion %":"Passing","Progressive Passes":"Passing","Progressive Carries":"Possession","Successful Take-Ons":"Possession","Touches (Att Pen)":"Possession","Progressive Passes Rec":"Possession",Tackles:"Defending",Interceptions:"Defending",Blocks:"Defending",Clearances:"Defending","Aerials Won":"Defending"}; const categories: { [key: string]: StatCategory } = {Shooting:{title:"Finalizações",stats:[]},Passing:{title:"Criação",stats:[]},Possession:{title:"Posse de Bola",stats:[]},Defending:{title:"Defesa",stats:[]},Discipline:{title:"Disciplina",stats:[]}}; percentiles.forEach((p)=>{const k=categoryMapping[p.statistic];if(k){categories[k].stats.push({label:labelTranslations[p.statistic]||p.statistic,value:p.per90,rank:convertPercentileToRank(p.percentile)})}}); categories.Discipline.stats.push({label:"Cartões Amarelos",value:mainStats.stats.yellow_cards || 0});categories.Discipline.stats.push({label:"Cartões Vermelhos",value:mainStats.stats.red_cards || 0}); const detailedStatsData = Object.values(categories).filter(c => c.stats.length > 0); const getPercentile = (statName: string): number => { const stat = percentiles.find(p => p.statistic === statName); return stat ? Math.round(stat.percentile) : 0; }; const defensiveAvg = Math.round((getPercentile("Tackles") + getPercentile("Interceptions") + getPercentile("Blocks")) / 3); const latestMatch = playerData.match_history[0]; const latestAgeString = latestMatch?.player_performance.sections.summary.Age || "??-"; const age = latestAgeString.split('-')[0]; const nationString = latestMatch?.player_performance.sections.summary.Nation || ""; const nationCode = nationString.split(" ")[0].toUpperCase(); const flagUrl = nationCode ? `https://img.sofascore.com/api/v1/country/${nationCode}/flag` : ""; const positionTranslations: { [key: string]: string } = { GK: "Goleiro", DC: "Zagueiro", LB: "Lateral Esq.", RB: "Lateral Dir.", WB: "Ala", DM: "Volante", MC: "Meia Central", AM: "Meia-atacante", LW: "Ponta Esq.", RW: "Ponta Dir.", ST: "Centroavante", FW: "Atacante" }; const translatePosition = (pos: string): string => pos.split(',').map(p => p.trim()).map(p => positionTranslations[p] || p).join(' / '); const playerInfo: PlayerInfo = { name: playerData.name, description: `${translatePosition(playerData.position)} de ${age} anos`, image: playerData.profile_image.startsWith('http') ? playerData.profile_image : `https://${playerData.profile_image}`, flag: flagUrl, stats: { labels: ["Criação", "Aéreo", "Defensivo", "Gols", "Chutes", "Toques"], data: [ getPercentile("Shot-Creating Actions"), getPercentile("Aerials Won"), defensiveAvg, getPercentile("Non-Penalty Goals"), getPercentile("Shots Total"), getPercentile("Touches (Att Pen)") ] }, currentTeam: { name: playerData.current_team.name, image_url: playerData.current_team.image_url } }; const xG_p90 = parseFloat(percentiles.find(p => p.statistic.includes("npxG"))?.per90 || "0"); const xA_p90 = parseFloat(percentiles.find(p => p.statistic.includes("xAG"))?.per90 || "0"); const gamesPlayed = mainStats.stats["90s"]; const seasonStats: SeasonStatsData = { competition: `Série A ${mainStats.year}`, competitionLogo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/268.png", minutesPlayed: mainStats.stats.minutes_played, goals: mainStats.stats.goals, assists: mainStats.stats.assists, rating: mainStats.stats.rating, matches: mainStats.stats.appearances, xG: xG_p90 * gamesPlayed, xA: xA_p90 * gamesPlayed, yellowCards: mainStats.stats.yellow_cards, redCards: mainStats.stats.red_cards }; return { playerInfo, seasonStats, detailedStatsData };
};



function RightSidebarContent() {
    const searchParams = useSearchParams();
    const playerId = searchParams.get('playerId');

    const [playerData, setPlayerData] = useState<ApiPlayerData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    
    useEffect(() => {
        if (!playerId) { setPlayerData(null); return; }
        
        const fetchPlayerData = async () => {
            setIsLoading(true); setError(null);
            try {
                const response = await fetch(`http://localhost:8080/api/player/${playerId}`);
                if (!response.ok) throw new Error(`Falha ao buscar dados.`);
                const data: ApiPlayerData = await response.json();
                data.match_history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setPlayerData(data);
                setCurrentMatchIndex(0);
                setCurrentCategoryIndex(0);
            } catch (err: any) { setError(err.message);
            } finally { setIsLoading(false); }
        };

        fetchPlayerData();
    }, [playerId]);

    

    if (!playerId) {
        return (
            <div className="border border-lines rounded-lg p-4 flex flex-col items-center justify-center text-center text-light h-[500px]">
                <CompassIcon size={48} className="mx-auto text-lines mb-4" />
                <h3 className="font-bold text-lg">Explore um Jogador</h3>
                <p className="text-sm text-lines max-w-xs">Clique no nome de um jogador em um post para ver suas estatísticas detalhadas aqui.</p>
            </div>
        );
    }
    
    if (isLoading) return <div className="flex items-center justify-center h-[500px]"><div className="w-12 h-12 border-4 border-lines border-t-orange rounded-full animate-spin"></div></div>;
    if (error) return <div className="flex items-center justify-center h-[500px] text-red-500 text-center">Erro ao carregar jogador.<br/>Verifique se a API está rodando.</div>;
    if (!playerData || !playerData.statistics?.length || !playerData.match_history?.length) { return <div className="flex items-center justify-center h-[500px] text-lines">Dados do jogador estão incompletos.</div>; }

    const { playerInfo, seasonStats, detailedStatsData } = transformApiData(playerData);

    const handlePrevCategory = () => setCurrentCategoryIndex((prev) => (prev - 1 + detailedStatsData.length) % detailedStatsData.length);
    const handleNextCategory = () => setCurrentCategoryIndex((prev) => (prev + 1) % detailedStatsData.length);
    const handlePrevMatch = () => setCurrentMatchIndex((prev) => (prev - 1 + playerData.match_history.length) % playerData.match_history.length);
    const handleNextMatch = () => setCurrentMatchIndex((prev) => (prev + 1) % playerData.match_history.length);

    return (
        <div className="border border-lines rounded-lg p-4 flex flex-col gap-4">
            <header className="flex justify-between items-center"><div className="flex items-center gap-2 text-light"><CaretLeftIcon size={24} className="cursor-pointer" /><CaretRightIcon size={24} className="text-gray-600" /></div><StarIcon size={24} className="text-light cursor-pointer" /></header>
            <PlayerCard player={playerInfo} />
            <div className="flex gap-4">
                <p className="flex items-center justify-center bg-orange rounded-lg w-37 font-bold text-light py-2 px-4">€{(playerData.market_value / 1_000_000).toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})} MI</p>
                <div className="flex gap-2 items-center w-36 flex-grow bg-dark rounded-lg justify-center py-2">
                    <img src={playerInfo.currentTeam.image_url} className="size-6" alt={`Escudo do ${playerInfo.currentTeam.name}`} />
                    <p className="font-bold text-light">{playerInfo.currentTeam.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-2">
                <CaretLeftIcon size={24} className="cursor-pointer text-light" onClick={handlePrevMatch} />
                <h4 className="text-sm text-light font-bold">Últimas Partidas</h4>
                <CaretRightIcon size={24} className="cursor-pointer text-light" onClick={handleNextMatch} />
            </div>
            <MatchCard match={playerData.match_history[currentMatchIndex]} playerTeamName={playerData.current_team.name} />
            <SeasonStatsCard stats={seasonStats} />
            <div className="flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <CaretLeftIcon size={24} className="cursor-pointer text-light hover:text-white" onClick={handlePrevCategory} />
                    <div className="flex items-center gap-1">
                        <p className="text-sm text-light font-bold">{detailedStatsData[currentCategoryIndex]?.title}</p>
                        <div className="relative group flex items-center"><InfoIcon size={16} className="text-light ml-1 cursor-pointer" /><div className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 mb-2 w-60 p-2 bg-black border border-lines text-light text-center text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Valores por 90 minutos de jogo.</div></div>
                    </div>
                    <CaretRightIcon size={24} className="cursor-pointer text-light hover:text-white" onClick={handleNextCategory} />
                </header>
                {detailedStatsData[currentCategoryIndex] && <DetailedStatsDisplay category={detailedStatsData[currentCategoryIndex]} />}
            </div>
        </div>
    );
}


export default function RightSidebar() {
    return (
        <aside className="p-6 min-h-screen">
            <SearchBar />
            <Suspense fallback={
                <div className="flex items-center justify-center h-[500px]">
                    <div className="w-12 h-12 border-4 border-lines border-t-orange rounded-full animate-spin"></div>
                </div>
            }>
                <RightSidebarContent />
            </Suspense>
        </aside>
    );
}