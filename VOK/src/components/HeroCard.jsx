// components/HeroCard.jsx
const HeroCard = ({ hero, onClick }) => {
  return (
    <div
      className="bg-white/5 border border-white/10 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
      onClick={() => onClick(hero)}
    >
      <h3 className="text-xl font-bold mb-2">{hero.heroName}</h3>
      <p className="text-sm text-white/70 line-clamp-2">{hero.whatTheyDo}</p>
      <p className="text-xs text-white/50 mt-4">
        Nominated by {hero.yourName} – {new Date(hero.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default HeroCard;
