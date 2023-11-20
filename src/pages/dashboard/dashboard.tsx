import { LayoutBase } from '../../compartilhar/layout';
import { FerramentasDetalhe} from '../../compartilhar/components';


export const Dashboard = () => {

  return (
    <LayoutBase
    titulo='Página inicial' barraFerramentas={(
        <FerramentasDetalhe mostrarSalvareFechar />
    )}>
      
    </LayoutBase>
  );
};