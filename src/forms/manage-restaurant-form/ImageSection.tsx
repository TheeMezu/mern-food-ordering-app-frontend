import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { control, watch} = useFormContext();

    // we use watch so we can update the image instatnly, and not w8 for 
    // the components to mount, dealing with imgs are different than 
    // normal data which is why watch is important as it retrieves the 
    // image from cloudinary 

    // the reason why we called imageUrl and not imageFile, is that imageFile
    // is what we send to the backend which then is stored in cloudinary
    // and we get back imageUrl which is the res we recieve from cloudinary 

    // it knows about imageUrl because of how we are prepopulating our data 
    // when using useEffect which calls the api request to get data about 
    // a restuarant  that we save in updatedRestaurant which then gives 
    // us access to an imageUrl field 
    const exisitingImageUrl = watch("imageUrl")
    return (
        <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Image</h2>
            <FormDescription>
            Add an image that will be displayed on your restaurant listing in the
            search results. Adding a new image will overwrite the existing one.
            </FormDescription>
        </div>

        <div className="flex flex-col gap-8 md:w-[50%]">
            {exisitingImageUrl && 
            <AspectRatio ratio={16/9}>
                <img src={exisitingImageUrl} 
                    className="rounded-md object-cover h-full w-full"/>
            </AspectRatio>
            }
            <FormField
            control={control}
            name="imageFile"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input
                    className="bg-white"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                        field.onChange(
                        event.target.files ? event.target.files[0] : null
                        )
                    }
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        </div>
    );
};

export default ImageSection;


// we pass field in the render so we can use onChange methods etc 
// and then we say accept where we specfify the types of the uploaded files
// then we add an extra check to only accept 1 file, as the user might try 
// to upload multiple files at once which is why we target only one file