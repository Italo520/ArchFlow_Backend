import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../../services/project.service';

export default function NewProject() {
    const [name, setName] = useState('');
    const [clientName, setClientName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // Prevent default if called from form submit, but button click might handle it directly
        if (e) e.preventDefault();

        setLoading(true);
        setError('');
        try {
            await ProjectService.createProject({ name, clientName });
            navigate('/dashboard');
        } catch (err) {
            setError('Erro ao criar projeto. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <div className="flex-shrink-0">
                {/* TopAppBar */}
                <div className="flex h-16 items-center bg-background-light dark:bg-background-dark p-4 pb-2">
                    <button
                        aria-label="Voltar"
                        onClick={() => navigate('/dashboard')}
                        className="text-neutral-900 dark:text-neutral-50 flex h-12 w-12 shrink-0 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <span className="material-symbols-outlined text-3xl">arrow_back</span>
                    </button>
                </div>
            </div>

            <main className="flex-grow overflow-y-auto px-4">
                <div className="mx-auto flex h-full max-w-md flex-col justify-center">
                    {/* HeadlineText */}
                    <h1 className="text-neutral-900 dark:text-neutral-50 tracking-tight text-3xl font-bold leading-tight text-left pb-3 pt-6">Criar Novo Projeto</h1>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* TextField for Project Name */}
                    <div className="py-3">
                        <label className="flex flex-col">
                            <p className="text-neutral-900 dark:text-neutral-200 text-base font-medium leading-normal pb-2">Nome do Projeto</p>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-900 dark:text-neutral-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-neutral-300 dark:border-neutral-600 bg-background-light dark:bg-background-dark focus:border-primary/80 h-14 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 p-4 text-base font-normal leading-normal"
                                placeholder="Insira o nome do projeto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* TextField for Client Name */}
                    <div className="py-3">
                        <label className="flex flex-col">
                            <p className="text-neutral-900 dark:text-neutral-200 text-base font-medium leading-normal pb-2">Nome do Cliente</p>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-900 dark:text-neutral-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-neutral-300 dark:border-neutral-600 bg-background-light dark:bg-background-dark focus:border-primary/80 h-14 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 p-4 text-base font-normal leading-normal"
                                placeholder="Insira o nome do cliente"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </main>

            <div className="flex-shrink-0">
                {/* ButtonGroup */}
                <div className="flex flex-1 flex-wrap gap-3 p-4 justify-between border-t border-neutral-200 dark:border-neutral-700 bg-background-light dark:bg-background-dark">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                        <span className="truncate">Cancelar</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white dark:text-neutral-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 disabled:opacity-50"
                    >
                        <span className="truncate">{loading ? 'Criando...' : 'Criar Projeto'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
