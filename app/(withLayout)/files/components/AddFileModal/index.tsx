import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { addFileSchema, AddFileSchema } from "./addFileSchema";

export function AddFileModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<AddFileSchema>({
    resolver: zodResolver(addFileSchema),
    defaultValues: {
      file: undefined,
      type: undefined,
    },
    mode: "onChange",
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const fileURL = URL.createObjectURL(file);
        setAudioSrc(fileURL);
        setIsPlaying(false);
        setValue("file", file);
        clearErrors("file");
      }
    },
    [setValue, clearErrors],
  );

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    maxFiles: 1,
    accept: { "audio/*": [] },
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => {
        setIsPlaying(false);
      };

      audioElement.addEventListener("ended", handleEnded);

      return () => {
        audioElement.removeEventListener("ended", handleEnded);
        if (audioSrc) {
          URL.revokeObjectURL(audioSrc);
        }
      };
    }
  }, [audioSrc]);

  const handleRemove = useCallback(() => {
    setAudioSrc(null);
    setIsPlaying(false);
    // @ts-ignore
    setValue("file", null);
    clearErrors("file");
    acceptedFiles.length = 0;
  }, [setValue, clearErrors, acceptedFiles]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const files = acceptedFiles.map((file) => (
    <li
      key={file.name}
      className="w-40 space-y-2 rounded-md border-[0.5px] p-2"
    >
      {audioSrc && (
        <div className="flex w-full items-center justify-center">
          <audio ref={audioRef} src={audioSrc} />
          <Button
            type="button"
            onClick={togglePlayPause}
            className="mt-2 size-10 rounded-full bg-blue-500 text-white"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
        </div>
      )}
      <p className="truncate text-xs">{file.name}</p>
      <p className="text-xs">{file.size} bytes</p>
      <button onClick={handleRemove} className="text-xs text-red-500 underline">
        Remover
      </button>
    </li>
  ));

  const onSubmit = (data: AddFileSchema) => {
    console.log(data);
  };

  useEffect(() => {
    if (!isOpen) {
      handleRemove();
      clearErrors();
      reset({
        file: undefined,
        type: undefined,
      });
    }
  }, [isOpen, clearErrors, reset, handleRemove]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="Adicionar arquivo"
      >
        <DialogHeader>
          <DialogTitle>Adicionar arquivo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo de buzina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="default">Padrão</SelectItem>
                      <SelectItem value="funny">Divertida</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.type && (
            <p className="-mt-3 text-xs text-red-500">{errors.type.message}</p>
          )}

          <div
            {...getRootProps({ className: "dropzone" })}
            className="h-40 w-full rounded-md border-[0.5px] border-black p-2"
          >
            <input {...getInputProps()} />
            {files.length <= 0 && (
              <p className="text-sm">
                Arraste e solte alguns arquivos aqui, ou{" "}
                <span className="cursor-pointer underline" onClick={open}>
                  clique aqui
                </span>{" "}
                para selecionar arquivos
              </p>
            )}
            <ul>{files}</ul>
          </div>
          {errors.file && (
            <p className="-mt-3 text-xs text-red-500">{errors.file.message}</p>
          )}
          <DialogFooter>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
