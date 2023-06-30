import Game from "./Game";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="text-6xl font-bold mb-5">Scaccle</div>
      <Game />
    </div>
  );
}
