// import React from "react";
// import { getTheme } from "@fluentui/react";

import React from "../assets/react.development.js";
import ReactDOM from "../assets/react-dom.development.js";
import FluentUIReact from "../assets/fluentui-react.min.js";

const { ReactDOM, React, FluentUIReact } = window as any; // eslint-disable-line

const theme = FluentUIReact.getTheme();

const functionsObj = {
  functions: [
    {
      description: "Hello Worlds rev",
      id: "helloWorld",
      name: "HELLO",
      parameters: [],
      result: {
        type: "string",
      },
    },
    {
      description: "From Latitude, Longitude to What3Words",
      id: "LatLngToWhatFreeWords",
      name: "WHAT3WORDS",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "number",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "From Latitude, Longitude to Pluscode",
      id: "LatLngToPluscode",
      name: "PLUSCODE",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "number",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Population Density at point (ppl/ha)",
      id: "PopulationDensity",
      name: "POPDENS",
      parameters: [
        {
          description: "Latitude of point",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "number",
      },
    },
    {
      description:
        "Population within provided walking distance in minutes from point",
      id: "PopulationDensityWalk",
      name: "POPDENSWALK",
      parameters: [
        {
          description: "Time in minutes",
          name: "Minutes",
          type: "number",
        },
        {
          description: "Latitude of point",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "number",
      },
    },
    {
      description:
        "Population within provided biking distance in minutes from point",
      id: "PopulationDensityBike",
      name: "POPDENSBIKE",
      parameters: [
        {
          description: "Time in minutes",
          name: "Minutes",
          type: "number",
        },
        {
          description: "Latitude of point",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "number",
      },
    },
    {
      description:
        "Population within provided driving distance in minutes from point",
      id: "PopulationDensityCar",
      name: "POPDENSCAR",
      parameters: [
        {
          description: "Time in minutes",
          name: "Minutes",
          type: "number",
        },
        {
          description: "Latitude of point",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "number",
      },
    },
    {
      description: "Population within provided distance in meters from point",
      id: "PopulationDensityBuffer",
      name: "POPDENSBUF",
      parameters: [
        {
          description: "Buffer in meters.",
          name: "Buffer",
          type: "number",
        },
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "number",
      },
    },
    {
      description: "Administrative zone from latitude and longitude (level 1)",
      id: "AdminLevel1",
      name: "ADMINLEVEL1",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Administrative zone from latitude and longitude (level 2)",
      id: "AdminLevel2",
      name: "ADMINLEVEL2",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Fuzzy corrections of administrative level 2 (Levenstein)",
      id: "AdminLevel2FuzzyLev",
      name: "FUZZYADMINLEVEL2LEV",
      parameters: [
        {
          description: "Admin level 2 to fuzzy searm.",
          name: "admin2",
          type: "string",
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Fuzzy corrections of administrative level 2 (trigrams)",
      id: "AdminLevel2FuzzyTri",
      name: "FUZZYADMINLEVEL2TRI",
      parameters: [
        {
          description: "Admin level 2 to fuzzy searm.",
          name: "admin2",
          type: "string",
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Urban classification from latitude and longitude.",
      id: "UrbanStatus",
      name: "URBANSTATUS",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Urban classification from latitude and longitude. (simple)",
      id: "UrbanStatusSimple",
      name: "URBANSTATUSSIMPLE",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Nearest placename from latitude and longitude.",
      id: "NearestPlace",
      name: "NEARESTPLACE",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Nearest point of interest from latitude and longitude.",
      id: "NearestPoi",
      name: "NEARESTPOI",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Nearest bank from latitude and longitude.",
      id: "NearestBank",
      name: "NEARESTBANK",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "string",
      },
    },
    {
      description: "Distance to nearest bank from latitude and longitude.",
      id: "NearestBankDist",
      name: "NEARESTBANKDIST",
      parameters: [
        {
          description: "Latitude of point.",
          name: "Latitude",
          type: "any",
        },
        {
          description: "Longitude of point.",
          name: "Longitude",
          type: "number",
          optional: true,
        },
      ],
      result: {
        type: "number",
      },
    },
  ],
};

class Documentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functions: [],
    };
  }

  componentDidMount() {
    this.setState({
      functions: functionsObj.functions,
    });
  }

  render() {
    const iterParams = (p, idx) => {
      return (
        <ul key={idx}>
          <li>{p.description}</li>
          <li>{p.name}</li>
          <li>{p.type}</li>
          <li>{p.optional && "True"}</li>
        </ul>
      );
    };
    const listItems = this.state.functions.map((f, idx) => {
      return (
        <div
          key={idx}
          style={{ boxShadow: theme.effects.elevation8, background: "red" }}
        >
          <p>{f.description}</p>
          <p>{f.id}</p>
          <p>{f.name}</p>
          {f.parameters.length > 0 && f.parameters.map(iterParams)}
          <p>{f.result.type}</p>
        </div>
      );
    });
    return <div>{listItems}</div>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Documentation />
  </React.StrictMode>,
  document.getElementById("root")
);
