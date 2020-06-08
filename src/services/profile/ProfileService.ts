import {Injectable, NotFoundException} from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {from, Observable, of} from "rxjs";
import {mapTo, switchMap} from "rxjs/operators";

import {PROFILE_MODEL_NAME, ProfileModel} from "../../models/ProfileModel";

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(PROFILE_MODEL_NAME)
        private readonly profileModel: Model<ProfileModel>
    ) {}

    public saveProfile(profile: ProfileModel): Observable<void> {
        const newProfile = new this.profileModel(profile)

        return from(newProfile.save()).pipe(mapTo(void(0)))
    }

    public getProfile(email: string): Observable<ProfileModel> {
        return from(this.profileModel.findOne({email}).exec()).pipe(
            switchMap(savedModel => {
                if (!savedModel) {
                    throw new NotFoundException('Profile not found')
                }

                return of(savedModel)
            })
        )
    }
}
