import React from 'react';

function GameDoc() {
  return (
    <div>
      <h2>Summary of races</h2>
      <ul>
        <li>
          <strong>Human (any remaining color)</strong>
          <p>
            Standard game play. Play human if you never played the game
            before.
            <br />
            You can move more ships at once, you have a good commercial
            exchange ratio (1:2), and have the ability to build star bases
            from the start.
            <br />
            You will have no race specific boost, but it will be balanced by
            a excellent flexibility.
          </p>
          <p>
            <strong>Strong point</strong> : You should adapt to the game
            events better than other players to claim the victory.
          </p>
        </li>

        <li>
          <strong>Mechanema (white)</strong>
          <p>
            Play Mechanema if you want to play aggressive at the end.
            <br />
            You will be able to build and customize your ships faster than
            the other players, provided that you can grab enough ressources
            for that.
          </p>
          <p>
            <strong>Strong point</strong> : You should grab resources to get
            the strongest fleet at the end of game.
          </p>
        </li>

        <li>
          <strong>Orion Hegemony (black)</strong>
          <p>
            Play Orion Hegemony if you want to play aggressive from start.
            <br />
            You will have the strongest fleet at the sart of game, and start
            with a cruiser where other players have only an interceptor.
            <br />
            You have an extra victory point slot, but lack one alliance
            slot.
            <br />
            Also you have a very bad commercial rate (1:4).
          </p>
          <p>
            <strong>Strong point</strong> : You should grab the most juicy
            victory points from the start, build a strong advance to ensure
            victory.
          </p>
        </li>

        <li>
          <strong>Epsilon Eridani (red)</strong>
          <p>
            Play Epsilon Eridani if you feel like en economist.
            <br />
            You start with and already developed civilization but your
            economy is in jeopardy.
            <br />
            On the other side, you have some advance : 2 VP tiles and 3
            technologies to upgrade you ships, a good money stock, and extra
            energy on your ships.
            <br />
            You must stabilize your economy or you might end stun-locked at
            the end of the game.
          </p>
          <p>
            <strong>Strong point</strong> : Stabilize your economy early and
            you should push you overall advance to the end of the game.
          </p>
        </li>

        <li>
          <strong>Hydran Progress (blue)</strong>
          <p>
            Play Hydran Progress if you feel like a scientific.
            <br />
            You start with advanced science production and can research 2
            technologies at once.
            <br />
            You weak point is that but have very low mineral production at
            the start.
            <br />
            You will have to adapt at the available technologies to
            compensate and plan your game accordingly.
          </p>
          <p>
            <strong>Strong point</strong> : You should build the most
            advanced technology tracks to score additional winning victory
            point with them.
          </p>
        </li>

        <li>
          <strong>Draco (yellow)</strong>
          <p>
            Play Draco if you feel like a protecting the NPCs.
            <br />
            You will be able to use the ancient NPC production planets and
            claim their sector without fighting them.
            <br />
            On each exploration you will be able to choose between two
            sectors. You will score extra VP for each ancient still alive at
            the end.
            <br />
            On the other side, you can not claim the discoveries tiles on
            their sector while they are alive.
            <br />
            That will make you look very juicy to other races, and therefore
            you are very likely to get attacked.
            <br />
          </p>
          <p>
            <strong>Strong point</strong> : You should get the most
            ressources and win by protecting your ancient NPCs and
            dominions.
          </p>
        </li>

        <li>
          <strong>Planta (green)</strong>
          <p>
            Play Planta if you feel like an explorer.
            <br />
            You will be able to explore twice faster than other players, and
            score 1 extra VP for each sector you get at the end of game.
            <br />
            You start with less adaptable ships and your population cannot
            defend from invasion.
            <br />
            You will win the game if you are not contested, so prepare
            yourself for you WILL be attacked by other players.
          </p>
          <p>
            <strong>Strong point</strong> : You should expand and lock your
            domain and win the game by resisting to invasions.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default GameDoc;
