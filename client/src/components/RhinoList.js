import RhinoItem from './RhinoItem';

const RhinoList = () => {
  const rhinos = [
    {
      id: '51ab9db0-33ae-40d9-a678-45a397e6f4a3',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '2f127150-7cc6-4598-a6cd-26e48cda8a93',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: 'a43cbe91-dc37-475a-b95b-ff66cdcabbb3',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '415c38a5-dab2-4b01-a5a9-7689b1aea8d0',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '88c7aebd-344e-4899-b0fc-485ea9350c45',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: 'd6a7a465-b1c6-426b-af5b-cdee54ed62fc',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '9cdfa85a-8d1c-4e9d-a89d-43721c619087',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '247d6db2-8cef-49b8-982c-8d785203a1f4',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: 'cfb0ed0a-8a37-488b-af5c-20cdecde0b9d',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '133b9434-be65-4d42-a91b-4582db7e5d39',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
    {
      id: '9b36a5bb-9d56-4a9a-9787-f6310f918ccd',
      name: 'Aidan2',
      species: 'black_rhinoceros',
    },
  ];
  return (
    <div>
      {rhinos.map((rhino) => {
        return <RhinoItem key={rhino.id} rhino={rhino} />;
      })}
    </div>
  );
};

export default RhinoList;
