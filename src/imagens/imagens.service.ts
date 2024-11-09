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
  async listUrl() {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });
    const { data, error } = await supabase.storage
      .from('Imagens')
      .createSignedUrl('1234e.jpg', 32000000); // o tempo para expirar esta com 1 ano. Não tem como gerar sem o tempo para expirar
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
