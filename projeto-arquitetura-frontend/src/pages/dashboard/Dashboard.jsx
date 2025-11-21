import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../../services/project.service';
import AuthService from '../../services/auth.service';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus, LogOut, FolderGit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await ProjectService.getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error loading projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FolderGit2 className="h-6 w-6" />
                        <h1 className="text-xl font-bold">ArchFlow</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
                        <p className="text-muted-foreground">Gerencie seus projetos de arquitetura.</p>
                    </div>
                    <Button onClick={() => navigate('/projects/new')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Projeto
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">Carregando...</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                    <CardDescription>{project.clientName}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'TO_DO' ? 'bg-yellow-100 text-yellow-800' :
                                                project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {projects.length === 0 && (
                            <div className="col-span-full text-center py-12 border rounded-lg border-dashed text-muted-foreground">
                                Nenhum projeto encontrado. Crie o primeiro!
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
