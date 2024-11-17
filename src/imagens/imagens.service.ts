import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { FileDTO } from './imagens.dto';

@Injectable()
export class ImagensService {
  async upload(file: FileDTO) {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const data = await supabase.storage
      .from('Imagens')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    return data;
  }

  // gera o link
  async listUrl(imageName) {
    if (!imageName) {
        throw new Error("Nome da imagem não fornecido.");
    }

    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
        auth: {
            persistSession: false,
        },
    });

    const { data, error } = await supabase.storage
        .from('Imagens')
        .createSignedUrl(imageName, 32000000); // Substitui 1234e.jpg pelo nome fornecido

    if (error) {
        console.error("Erro ao gerar URL assinada:", error);
        return null;
    }

    return data;
}

  async listAll() {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });
    const { data, error } = await supabase.storage.from('Imagens').list();

    console.log(data);
    return data;
  }
}
