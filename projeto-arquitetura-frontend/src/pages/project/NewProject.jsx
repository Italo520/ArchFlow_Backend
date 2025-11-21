import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../../services/project.service';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function NewProject() {
    const [name, setName] = useState('');
    const [clientName, setClientName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-[450px]">
                    <CardHeader>
                        <CardTitle>Novo Projeto</CardTitle>
                        <CardDescription>Crie um novo projeto para começar a gerenciar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nome do Projeto</Label>
                                    <Input
                                        id="name"
                                        placeholder="Ex: Residência Silva"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="clientName">Nome do Cliente</Label>
                                    <Input
                                        id="clientName"
                                        placeholder="Ex: João Silva"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-sm text-destructive">{error}</p>}
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <Button variant="outline" type="button" onClick={() => navigate('/dashboard')}>Cancelar</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Criar Projeto
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
