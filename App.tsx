import { SafeAreaView } from 'react-native';
import { Select } from './src/components/Select';

const data = [
  {id:1, title:"Priscilla Soares Coelho"},
  {id:2, title:"Abílio Soares Coelho"},
  {id:3, title:"Patrícia Soares Coelho"},
  {id:4, title:"Mateus Soares Coelho"},
]

export default function App() {
  return (
    <SafeAreaView style={{gap:10, marginHorizontal:20}}>
      <Select title='Selecione o usuário' option={data} onSelect={(item)=> console.log(item)} />
    </SafeAreaView>
  );
}


