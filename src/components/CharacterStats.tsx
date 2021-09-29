import { css, Theme } from "@emotion/react";
import {
  ArtsResistanceIcon,
  AttackPowerIcon,
  AttackSpeedIcon,
  BlockIcon,
  DPCostIcon,
  DefenseIcon,
  HealthIcon,
  RedeployTimeIcon,
} from "./icons/operatorStats";
import CharacterRange from "./CharacterRange";
import { CharacterObject } from "../utils/types";
import { highestCharacterStats } from "../utils/globals";
import { summonImage } from "../utils/images";

export interface CharacterStatsProps {
  characterObject: CharacterObject;
}

const CharacterStats: React.VFC<CharacterStatsProps> = ({
  characterObject,
}) => {
  const {
    artsResistance,
    attackPower,
    attacksPerSecond,
    blockCount,
    defense,
    dpCost,
    health,
    rangeObject,
    redeployTimeInSeconds,
  } = highestCharacterStats(characterObject);
  const { id, name, profession } = characterObject;
  const isSummon = profession === "TOKEN";

  return (
    <section css={styles}>
      <h3 className="visually-hidden">
        {`${isSummon ? "Summon" : "Operator"} Stats`}
      </h3>
      <div className={isSummon ? "summon-stats" : "operator-stats"}>
        {isSummon && (
          <div className="summon-icon-cell">
            <img src={summonImage(id)} alt={name} />
          </div>
        )}
        <dl>
          <div className="health">
            <dt>
              <HealthIcon aria-hidden="true" /> Health
            </dt>
            <dd>{health}</dd>
          </div>

          <div className="attack-power">
            <dt>
              <AttackPowerIcon aria-hidden="true" /> Attack Power
            </dt>
            <dd>{attackPower}</dd>
          </div>

          <div className="defense">
            <dt>
              <DefenseIcon aria-hidden="true" /> Defense
            </dt>
            <dd>{defense}</dd>
          </div>

          <div className="attack-speed">
            <dt>
              <AttackSpeedIcon aria-hidden="true" /> Attack Speed
            </dt>
            <dd>{attacksPerSecond} sec</dd>
          </div>

          <div className="arts-resistance">
            <dt>
              <ArtsResistanceIcon aria-hidden="true" /> Arts Resistance
            </dt>
            <dd>{artsResistance}%</dd>
          </div>

          <div className="block">
            <dt>
              <BlockIcon aria-hidden="true" /> Block
            </dt>
            <dd>{blockCount}</dd>
          </div>

          <div className="redeploy-time">
            <dt>
              <RedeployTimeIcon aria-hidden="true" /> Redeploy Time
            </dt>
            <dd>{redeployTimeInSeconds} sec</dd>
          </div>

          <div className="dp-cost">
            <dt>
              <DPCostIcon aria-hidden="true" /> DP Cost
            </dt>
            <dd>{dpCost}</dd>
          </div>

          <div className="range">
            <dt>Range</dt>
            <dd>
              <CharacterRange rangeObject={rangeObject} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
export default CharacterStats;

const styles = (theme: Theme) => css`
  dl {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 195fr) 224fr;
    grid-auto-flow: column;
    gap: ${theme.spacing(0.25)};
    margin: ${theme.spacing(3, 0, 0)};

    .health {
      svg path {
        fill: ${theme.palette.lime};
      }
    }

    .attack-power {
      svg path {
        fill: ${theme.palette.red};
      }
    }

    .defense {
      svg path {
        fill: ${theme.palette.orange};
      }
    }

    .attack-speed {
      svg path {
        fill: ${theme.palette.yellow};
      }
    }

    .arts-resistance {
      svg path {
        fill: ${theme.palette.blue};
      }
    }

    .block {
      svg path {
        fill: ${theme.palette.softBlue};
      }
    }

    .redeploy-time {
      svg path {
        fill: ${theme.palette.pink};
      }
    }

    .dp-cost {
      svg path {
        fill: ${theme.palette.white};
      }
    }

    .range {
      grid-row-start: span 2;
      position: relative;
      border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};

      dd {
        position: absolute;
        top: -5px; /* this is needed to counteract extra space made by .visually-hidden */
        left: -5px;
        margin-top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;