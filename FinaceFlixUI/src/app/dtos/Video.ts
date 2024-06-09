export interface Video{

    CursoId: string; // Transformar para objeto
    Id: string;
    Nome: string; // Título do vídeo
    Descricao: string; // Descrição do vídeo
    Url: string; // URL do vídeo
    DuracaoSegundos: string; // Duração do vídeo em segundos
    FilePath?: string; // Caminho do arquivo de vídeo no servidor
    Dono: string;
}
