import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { EscolasService } from "../../../compartilhar/servicos/api/escolas/EscolasService";
import { useDebounce } from "../../../compartilhar/hooks";
import { boolean } from "yup";
import { useField } from "@unform/core";



interface IAutoCompletProps {

    isExternalLoading?: boolean;

}


export const AutoComplet: React.FC<IAutoCompletProps> = ({ isExternalLoading = false}) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField('escolasId');

    const { debounce } = useDebounce();


    const [opcoes, setOpcoes] = useState<TAutoCompletOption[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [busca, setBusca] = useState('')
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined)




    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newselectedId) => setSelectedId(newselectedId),
        })
    }, [registerField, fieldName, selectedId])



    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
          EscolasService.getAll(1, /* busca */)
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              } else {
                console.log(result);
    
                setOpcoes(result.data.map(escolas =>({ id: escolas.id, label: escolas.nome })));
              }
            });
        });

    }, [busca]);

    type TAutoCompletOption = {
        id: number;
        label: string;
    }


    const autoCompletSelectedOption = useMemo(() => {
        if (!selectedId) return null; {

    const selectedOption = opcoes.find(opcao => opcao.id === selectedId)
        if (!selectedOption) return null; 

        return selectedOption;        
        }
    }, [selectedId, opcoes]);


    return (
        <Autocomplete 
        value={autoCompletSelectedOption}
            loading={isLoading} 
            disabled={isExternalLoading}           
            onInputChange={(_, newValue) => setBusca(newValue)}
            options={opcoes}
            onChange={(_, newValue) => {setSelectedId(newValue?.id); setBusca(''); }}
            renderInput={(params) => (
                <TextField 
                    {...params}

                    label="Escolas"
                />
        )}
        
        />
    )
}
