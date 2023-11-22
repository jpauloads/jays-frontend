import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

export function ServiceDetailsPage() {
    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await api.get(`/caminho-para-servico/${id}`);
                setServiceDetails(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do serviço', error);
            }
        };

        if (id) {
            fetchServiceDetails();
        }
    }, [id]);

    // ...renderização dos detalhes do serviço
}
