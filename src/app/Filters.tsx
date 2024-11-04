import React from "react";

function Filters({
  uniqueSeasons,
  uniqueLevels,
  uniquePases,
  selectedSeason,
  setSelectedSeason,
  selectedLevel,
  setSelectedLevel,
  selectedPasse,
  setSelectedPasse,
  selectedMetric,
  setSelectedMetric,
  selectedMetricS,
  setSelectedMetricS,
}) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-200 rounded-lg shadow-md">
      <div className="flex items-center">
        <label htmlFor="season-filter" className="font-semibold mr-2">
          Filtrer par saison:
        </label>
        <select
          id="season-filter"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="p-2 border border-blue-400 rounded-md"
        >
          <option value="All">Toutes les saisons</option>
          {uniqueSeasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="level-filter" className="font-semibold mr-2">
          Filtrer par niveau:
        </label>
        <select
          id="level-filter"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="p-2 border border-blue-400 rounded-md"
        >
          <option value="All">Tous les niveaux</option>
          {uniqueLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="passe-filter" className="font-semibold mr-2">
          Filtrer par passe:
        </label>
        <select
          id="passe-filter"
          value={selectedPasse}
          onChange={(e) => setSelectedPasse(e.target.value)}
          className="p-2 border border-blue-400 rounded-md"
        >
          <option value="All">Tous les passes</option>
          {uniquePases.map((passe) => (
            <option key={passe} value={passe}>
              {passe}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="metric-filter" className="font-semibold mr-2">
          Choisir la première métrique:
        </label>
        <select
          id="metric-filter"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="p-2 border border-blue-400 rounded-md"
        >
          <option value="prix">Prix</option>
          <option value="age">Âge</option>
        </select>
        <span className="mx-4 font-semibold">et</span>
        <select
          id="metric-secondary"
          value={selectedMetricS}
          onChange={(e) => setSelectedMetricS(e.target.value)}
          className="p-2 border border-blue-400 rounded-md"
        >
          <option value="passe">Passe</option>
          <option value="niveau">Niveau</option>
          <option value="saison">Saison</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
